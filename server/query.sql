create table if not exists videos(
    id int auto_increament primary key,
    post json,
    status enum('inactive','active') default 'active' 
);