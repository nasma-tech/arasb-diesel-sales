db = db.getSiblingDB("erp");

db.createUser({
    user: "php-framework-v2",
    pwd: "75X44F3igJAL",
    roles: [
        {
            role: "readWrite",
            db: "erp"
        }
    ]
});