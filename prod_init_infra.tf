terraform {

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=2.46.0"
    }
  }
}

provider "azurerm" {
  features {}
}

locals {
  location = "Central India"
}


resource "azurerm_resource_group" "mynoteproduction" {
  name     = "mynoteproduction"
  location = local.location
}

resource "azurerm_storage_account" "mynoteproduction" {
  name                      = "acicaddybishalproduction"
  resource_group_name       = azurerm_resource_group.mynoteproduction.name
  location                  = azurerm_resource_group.mynoteproduction.location
  account_tier              = "Standard"
  account_replication_type  = "LRS"
  enable_https_traffic_only = true 
}

resource "azurerm_storage_share" "mynoteproduction" {
  name                 = "aci-caddy-data-bishal-production"
  storage_account_name = azurerm_storage_account.mynoteproduction.name
}


resource "azurerm_container_group" "mynoteproduction" {
  resource_group_name = "mynoteproduction"
  location            = local.location
  name                = "mynoteproduction"
  os_type             = "Linux"
  dns_name_label      = "mynoteproduction"
  ip_address_type     = "public"

  container {
    name   = "mynoteproduction"
    image  = "bsal/mynotes_prod"
    cpu    = "1"
    memory = "0.5"
  }

  container {
    name   = "caddy"
    image  = "caddy"
    cpu    = "1"
    memory = "0.5"

    ports {
      port     = 443
      protocol = "TCP"
    }

    ports {
      port     = 80
      protocol = "TCP"
    }

    volume {
      name                 = "aci-caddy-data-bishal-production"
      mount_path           = "/data"
      storage_account_name = azurerm_storage_account.mynoteproduction.name
      storage_account_key  = azurerm_storage_account.mynoteproduction.primary_access_key
      share_name           = azurerm_storage_share.mynoteproduction.name
    }

    commands = ["caddy", "reverse-proxy", "--from", "mynoteproduction.centralindia.azurecontainer.io", "--to", "localhost:4000"]
  }
}

output "url" {
  value = "https://${azurerm_container_group.mynoteproduction.fqdn}"
  description = "URL"
}