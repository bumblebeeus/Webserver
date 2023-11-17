provider "aws" { 
	region = "us-east-1" 
}

data "aws_ami" "ubuntu" {
	most_recent = true
	filter {
		name = "name"
		values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
	}
	owners = ["099720109477"]
}

resource "aws_instance" "server" { 
	# ami = "ami-09dd2e08d601bff67" 
	ami = data.aws_ami.ubuntu.id
	instance_type = "t2.micro" 
    key_name = "ssh-key"
	tags = { Name = "GameServer" } 
}

resource "aws_eip" "server_eip" {
  domain = "vpc"
  instance = aws_instance.server.id

  tags = {
    Name = "ServerEip"
  }
}

resource "aws_key_pair" "ssh-key" {
  key_name   = "ssh-key"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCpWupD7qXMuzL6xSjK7rbtd13R+qgkvDBRliwJ3I2c6llzjIPdW6nSHtSoZzQ1v83IkQPDqjzUZmkOBkVyKoZC7pSGyt4nc4SNERKsnmV2OU9K0BX8jutmZxX7XrWcioSaC1RB1LngjBHak69rexuMikJ4mvMxqfY+7U7Smzhq52Des3G0DRjRvoyKuTBNNu4obt7hOScscOmzUHFqqPJ1rcs+LNo6G/qLMPoVxGAJk+nYmpuqWPIAzAZ4a22Du5JJrBeL6Ct2Vkwa0nHVGtr8ZW5nKwLu1knX72coU1pnxJj7lGzs8zuqeODwe7FctsEaoFgDC+hu/DhBBNjmIKBqvhT+Wq6CyX0jhK/YakJ6Jg3dvymakc0no9SGzUHe5uay9ZlkwYqqB/L7ChIo5aakoHVavTGgXpTmDoTa5iGsksIM51McwUfw+u9/4j3SCllN6NVwC0nKfXh4epdSQXBjtTd0g06qK32pDIwPj/EQKZH9bUQT058eQLWwz+dDXc0= m3k4@Altergeist"
}
