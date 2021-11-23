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


resource "azurerm_resource_group" "mynotestaging" {
  name     = "mynotestaging"
  location = local.location
}

resource "azurerm_storage_account" "mynotestaging" {
  name                      = "acicaddybishalstaging"
  resource_group_name       = azurerm_resource_group.mynotestaging.name
  location                  = azurerm_resource_group.mynotestaging.location
  account_tier              = "Standard"
  account_replication_type  = "LRS"
  enable_https_traffic_only = true 
}

resource "azurerm_storage_share" "mynotestaging" {
  name                 = "aci-caddy-data-bishal-staging"
  storage_account_name = azurerm_storage_account.mynotestaging.name
}


resource "azurerm_container_group" "mynotestaging" {
  resource_group_name = "mynotestaging"
  location            = local.location
  name                = "mynotestaging"
  os_type             = "Linux"
  dns_name_label      = "mynotestaging"
  ip_address_type     = "public"

  container {
    name   = "mynotestaging"
    image  = "bsal/mynotes_staging"
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
      name                 = "aci-caddy-data-bishal-staging"
      mount_path           = "/data"
      storage_account_name = azurerm_storage_account.mynotestaging.name
      storage_account_key  = azurerm_storage_account.mynotestaging.primary_access_key
      share_name           = azurerm_storage_share.mynotestaging.name
    }

    commands = ["caddy", "reverse-proxy", "--from", "mynotestaging.centralindia.azurecontainer.io", "--to", "localhost:4000"]
  }
}

output "url" {
  value = "https://${azurerm_container_group.mynotestaging.fqdn}"
  description = "URL"
}