# Base de données

## Sur le serveur

### Recréer la base de données dans le conteneur Docker

```sh
# stopper le conteneur de l'API
docker stop camino-api_app_1

# démarrer psql dans le conteneur de la base de données
docker exec -it camino-api_postgres_1 psql postgres
```

```sql
# supprimer la base de données et la re-créer
DROP DATABASE camino; CREATE DATABASE camino; \q
```

```sh
# redémarrer le conteneur Docker de l'API
docker start camino-api_app_1
```

### Faire un dump de la base de données

```sh
docker exec -t camino-api_postgres_1 pg_dumpall -c -U postgres > /srv/tmp/camino.sql
```

### Importer la base de données depuis le répertoire tmp vers le conteneur Docker

```sh

# importer la base de données depuis le dump
cat /srv/tmp/camino.sql | docker exec -i camino-api_postgres_1 psql -U postgres -d camino
```

## En local

### Récupérer la base de données sauvegardée sur le serveur

```sh
scp <user>@<ip>:/srv/tmp/camino.sql /backups/
```

### Faire un dump de la base de données et l'uploader sur le serveur

```bash
pg_dump camino > backups/camino.sql && scp backups/camino.sql <user>@<ip>:/srv/tmp/camino.sql
```
