# BDD_Rest_Node_mysql1
Pasos para ejemplo de API-Rest plano de node y mysql:

docker run -d -p 33060:3306 --name mysql-db  -e --default-authentication-plugin=mysql_native_password -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=empresa_db  mysql

git clone https://github.com/bermudezc/BDD_Rest_Node_mysql1.git

cd BDD_Rest_Node_mysql1

npm install

NOTA: si no conecta por login hacer  ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'secret';






