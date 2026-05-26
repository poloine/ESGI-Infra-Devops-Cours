# Ansible - Configuration du Cluster Docker Swarm

## Objectif
Automatiser l'initialisation d'un cluster Docker Swarm via Ansible, en utilisant Docker-in-Docker (DinD) pour simuler un cluster de hosts Docker, connectés à un réseau Docker généré automatiquement par Docker Compose.

## Architecture

Les conteneurs DinD utilisés sont construits avec Python et `sudo` pré-installés (voir `Dockerfile`), car Ansible nécessite Python et des droits d'exécution sur les hôtes cibles.

## Installation

### Prérequis
- Docker et Docker Compose (pour les tests locaux)

## Utilisation locale (Docker-in-Docker)

### 1. Lancer les containers
```bash
docker compose up -d --scale node=3
```

Vérifier que tous les containers sont en cours d'exécution :
```bash
docker ps
```

### 2. Adapter l'inventaire
Éditer `ansible/inventory.ini` pour correspondre aux noms des containers (format : `{service-name}-{instance-number}`).

Exemple :
```ini
[managers]
ansible-manager-1

[managers:vars]
ansible_connection=community.docker.docker

[workers]
ansible-node-1
ansible-node-2
ansible-node-3

[workers:vars]
ansible_connection=community.docker.docker
```

### 3. Exécuter le playbook
```bash
./ansible.sh
```

Ou directement :
```bash
ansible-playbook -i ansible/inventory.ini ansible/init_swarm_cluster.yml
```

### 4. Vérifier le cluster
```bash
docker exec -it ansible-manager-1 ash
docker node ls
```

## Utilisation sur VMs/VPS SSH

### Configuration de l'inventaire
Éditer `ansible/inventory.ini` :

```ini
[managers]
ubuntu@192.168.1.10  ansible_port=22

[managers:vars]
ansible_connection=ssh
ansible_private_key_file=~/.ssh/id_rsa

[workers]
ubuntu@192.168.1.11  ansible_port=22
ubuntu@192.168.1.12  ansible_port=22
ubuntu@192.168.1.13  ansible_port=22

[workers:vars]
ansible_connection=ssh
ansible_private_key_file=~/.ssh/id_rsa
```

### Exécution
```bash
./ansible.sh
```

## Structure

- `compose.yml` : Configuration Docker Compose pour les tests locaux
- `Dockerfile` : Image DinD avec Python et sudo
- `ansible.sh` : Script d'exécution du playbook
- `ansible/inventory.ini` : Inventaire des hôtes
- `ansible/init_swarm_cluster.yml` : Playbook Ansible

## Références

- [Docker Swarm Documentation](https://docs.docker.com/engine/swarm/)
- [Ansible Documentation](https://docs.ansible.com/)
- [Ansible Docker Connection](https://docs.ansible.com/ansible/latest/collections/community/docker/docker_connection.html)
