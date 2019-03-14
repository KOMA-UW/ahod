create table if not exists user (
    id int not null auto_increment primary key,
    email varchar(128) not null unique,
    passhash binary(64) not null,
    username varchar(255) not null,
    firstname varchar(64) not null,
    lastname varchar(128) not null,
    photourl varchar(128) not null
);

create table if not exists group (
    groupid int not null auto_increment primary key,
    groupname varchar(128) not null unique,
    descriptions varchar(2083) not null, 
    foreign key(administrator) references user(id) not null,
    createdAt datetime not null,
    foreign key(creator) references user(id),
    comments varchar(2083) not null 
);

create table if not exists member_groups (
    foreign key(member_id) references member(id) not null,
    foreign key(groupid) references group(groupid) not null
)

create table if not exists member (
    id references user(id) not null,
    foreign key(groupid) references group(groupid) not null, 
    paid boolean not null,
    foreign key(pleaid) references plea(pleaid) not null,
    dataJoined datetime
)

create table if not exists plea(
    pleaid int not null auto_increment primary key,
    roundid int not null,
    plear_id int not null,
    body varchar(2083) not null,
    created_at datetime,
    foreign key (groupid) references group(groupid),
    foreign key(plear_id) references user(id) 
);

