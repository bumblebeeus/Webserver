output "eip" {
  value = aws_eip.server_eip.public_ip
  description = "The Elastic IP address (EIP) associated with the EC2 instance."
}