variable "PUB_SUB_CONNECTION_STRING" {
  type      = string
  sensitive = true
}

variable "PGHOST" {
  type      = string
  sensitive = true
}

variable "PGDATABASE" {
  type      = string
  sensitive = true
}

variable "PGUSER" {
  type      = string
  sensitive = true
}

variable "PGPASSWORD" {
  type      = string
  sensitive = true
}


# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0.2"
    }
    vercel = {
      source = "vercel/vercel"
      version = "~> 0.3"
    }
    render = {
      source = "render-oss/render"
      version = "1.3.6"
    }
  }
  backend "azurerm" {
    resource_group_name  = "tfstate"
    storage_account_name = "tfstate1083424934"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
  }
  required_version = ">= 1.1.0"
}

provider "render" {
  # Configuration options
  owner_id = "tea-ct9ps3ogph6c73efst3g"
}

provider "azurerm" {
  features {
    resource_group {
      prevent_deletion_if_contains_resources = false
    }
  }
}

resource "azurerm_resource_group" "gettothepoint-resource-group" {
  name     = "get-to-the-point-resource-group"
  location = "east us"
}

resource "azurerm_web_pubsub" "gettothepoint-pubsub" {
  name                = "gettothepoint-webpubsub"
  location            = azurerm_resource_group.gettothepoint-resource-group.location
  resource_group_name = azurerm_resource_group.gettothepoint-resource-group.name

  sku      = "Standard_S1"
  capacity = 1

  public_network_access_enabled = true

  live_trace {
    enabled                   = true
    messaging_logs_enabled    = true
    connectivity_logs_enabled = true
  }

  identity {
    type = "SystemAssigned"
  }
}

# resource "render_project" "my-project" {
#   name = "GetToThePoint"
#   environments = {
#     "production" : {
#       name : "production",
#       protected_status : "unprotected"
#     },
#   }
# }

# resource "render_web_service" "web" {
#   name               = "terraform-web-service"
#   plan               = "starter"
#   region             = "oregon"
#   start_command      = "node build/index.js"
#   pre_deploy_command = "echo 'hello world'"

#   runtime_source = {
#     native_runtime = {
#       auto_deploy   = true
#       branch        = "main"
#       build_command = "npm install && npm run build && npx run drizzle-kit push"
#       build_filter = {
#         paths         = ["src/**"]
#         ignored_paths = ["tests/**"]
#       }
#       repo_url = "https://github.com/ErdmanCT13/GetToThePoint"
#       runtime  = "node"
#     }
#   }

#   # disk = {
#   #   name       = "some-disk"
#   #   size_gb    = 1
#   #   mount_path = "/static"
#   # }

#   env_vars = {
#     "PUB_SUB_CONNECTION_STRING" = { value = azurerm_web_pubsub.gettothepoint-pubsub.primary_connection_string },
#   }

#   notification_override = {
#     preview_notifications_enabled = "false"
#     notifications_to_send         = "failure"
#   }

#   log_stream_override = {
#     setting = "drop"
#   }
# }


# A project that is not connected to a git repository.
# Deployments will need to be created manually through
# terraform, or via the vercel CLI.
resource "vercel_project" "gettothepoint_project" {
  name      = "gettothepoint"
  framework = "sveltekit"
}

data "vercel_project_directory" "gettothepoint_project_directory" {
  path = "../"
}

# data "vercel_prebuilt_project" "gettothepoint_prebuilt" {
#   path = "../src"
# }

resource "vercel_deployment" "gettothepoint_prod_deployment" {
  project_id  = vercel_project.gettothepoint_project.id
  files       = data.vercel_project_directory.gettothepoint_project_directory.files
  path_prefix = "../"
  
  production = true

  environment = {
    PUB_SUB_CONNECTION_STRING = var.PUB_SUB_CONNECTION_STRING
    PGHOST = var.PGHOST
    PGDATABASE = var.PGDATABASE
    PGUSER = var.PGUSER
    PGPASSWORD = var.PGPASSWORD
  }
}

# resource "vercel_project_environment_variables" "gettothepoint_prod_variables" {
#   project_id = vercel_project.gettothepoint_project.id
#   variables = [
#     {
#       key    = "PUB_SUB_CONNECTION_STRING"
#       value  = var.PUB_SUB_CONNECTION_STRING
#       target = ["production"]
#     },
#     {
#       key    = "PGHOST"
#       value  = var.PGHOST
#       target = ["production"]
#     },
#     {
#       key    = "PGDATABASE"
#       value  = var.PGDATABASE
#       target = ["production"]
#     },
#         {
#       key    = "PGUSER"
#       value  = var.PGUSER
#       target = ["production"]
#     },
#         {
#       key    = "PGPASSWORD"
#       value  = var.PGPASSWORD
#       target = ["production"]
#     },
#   ]
# }