DROP TABLE
    IF EXISTS users,
    user_follow_user,
    posts,
    comments,
    user_react_comment,
    user_react_post;

CREATE TABLE
    users (
        id INTEGER UNIQUE NOT NULL,
        passwordHash VARCHAR(100) NOT NULL,
        username VARCHAR(100) UNIQUE NOT NULL,
        profilePicture VARCHAR(1000),
        coverPicture VARCHAR(1000),
        fullName VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        gender BOOL NOT NULL,
        bio VARCHAR(1000),
        lastLogout DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP,
        PRIMARY KEY (id)
    );

CREATE TABLE
    user_follow_user (
        userSourceId INTEGER NOT NULL,
        userTargetId INTEGER NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP,
        PRIMARY KEY (userSourceId, userTargetId),
        FOREIGN KEY (userSourceId) REFERENCES users (id),
        FOREIGN KEY (userTargetId) REFERENCES users (id)
    );

CREATE TABLE
    posts (
        id INTEGER UNIQUE NOT NULL,
        ownerId INTEGER NOT NULL,
        contentImg VARCHAR(1000),
        contentText VARCHAR(1000),
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (ownerId) REFERENCES users (id)
    );

CREATE TABLE
    comments (
        id INTEGER UNIQUE NOT NULL,
        ownerId INTEGER NOT NULL,
        postId INTEGER NOT NULL,
        contentText VARCHAR(1000) NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (postId) REFERENCES posts (id),
        FOREIGN KEY (ownerId) REFERENCES users (id)
    );

CREATE TABLE
    user_react_post (
        postId INTEGER NOT NULL,
        userId INTEGER NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP,
        PRIMARY KEY (postId, userId),
        FOREIGN KEY (userId) REFERENCES users (id),
        FOREIGN KEY (postId) REFERENCES posts (id)
    );

CREATE TABLE
    user_react_comment (
        userId INTEGER NOT NULL,
        commentId INTEGER NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP,
        PRIMARY KEY (userId, commentId),
        FOREIGN KEY (commentId) REFERENCES comments (id),
        FOREIGN KEY (userId) REFERENCES users (id)
    );

insert into
    users (
        id,
        username,
        email,
        passwordHash,
        fullname,
        gender,
        profilePicture,
        coverPicture
    )
values (
        1,
        "admin",
        "admin@gmail.com",
        'admin',
        "Tran Tuan Binh",
        True,
        "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg",
        "https://cdna.artstation.com/p/assets/images/images/020/174/718/large/amarth-chen-9.jpg?1566698233"
    ), (
        2,
        "wDrag",
        "wDrag@gmail.com",
        '2',
        "Hoang Cong Vinh",
        True,
        "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg",
        "https://cdna.artstation.com/p/assets/images/images/020/174/718/large/amarth-chen-9.jpg?1566698233"
    ), (
        3,
        "hqvuet",
        "hqvuet@gmail.com",
        '3',
        "Hoang Quoc Viet",
        True,
        "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg",
        "https://cdna.artstation.com/p/assets/images/images/020/174/718/large/amarth-chen-9.jpg?1566698233"
    ), (
        4,
        "kiennguyen246",
        "kiennguyen246@gmail.com",
        '4',
        "Nguyen Duc Kien",
        True,
        "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg",
        "https://cdna.artstation.com/p/assets/images/images/020/174/718/large/amarth-chen-9.jpg?1566698233"
    ), (
        5,
        "luongtuan",
        "luongtuan@gmail.com",
        '5',
        "Luong Anh Tuan",
        True,
        "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg",
        "https://cdna.artstation.com/p/assets/images/images/020/174/718/large/amarth-chen-9.jpg?1566698233"
    ), (
        6,
        "quangNguyen",
        "quangnguyen@gmail.com",
        '6',
        "Nguyen Van Quang",
        True,
        "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg",
        "https://cdna.artstation.com/p/assets/images/images/020/174/718/large/amarth-chen-9.jpg?1566698233"
    );

insert into
    posts (
        id,
        ownerId,
        contentImg,
        contentText
    )
values (1, 1, null, "Post 1 của Bình"), (2, 1, null, "Post 2 của Bình"), (3, 1, null, "Post 3 của Bình"), (4, 2, null, "Post 1 của Vinh"), (5, 2, null, "Post 2 của Vinh"), (6, 2, null, "Post 3 của Vinh"), (7, 3, null, "Post 1 của Việt"), (8, 3, null, "Post 2 của Việt"), (9, 3, null, "Post 3 của Việt"), (10, 4, null, "Post 1 của Kiên"), (11, 4, null, "Post 2 của Kiên"), (12, 4, null, "Post 3 của Kiên"), (13, 5, null, "Post 1 của Tuấn"), (14, 5, null, "Post 2 của Tuấn"), (15, 5, null, "Post 3 của Tuấn"), (16, 6, null, "Post 1 của Quang"), (17, 6, null, "Post 2 của Quang"), (18, 6, null, "Post 3 của Quang");

insert into
    comments (
        id,
        ownerId,
        postId,
        contentText
    )
values (1, 1, 1, "Bình cmt"), (2, 1, 2, "Bình cmt"), (3, 1, 3, "Bình cmt"), (4, 1, 4, "Bình cmt"), (5, 1, 5, "Bình cmt"), (6, 1, 6, "Bình cmt"), (7, 1, 7, "Bình cmt"), (8, 1, 8, "Bình cmt"), (9, 1, 9, "Bình cmt"), (10, 1, 10, "Bình cmt"), (11, 1, 11, "Bình cmt"), (12, 1, 12, "Bình cmt"), (13, 1, 13, "Bình cmt"), (14, 1, 14, "Bình cmt"), (15, 1, 15, "Bình cmt"), (16, 1, 16, "Bình cmt"), (17, 1, 17, "Bình cmt"), (18, 1, 18, "Bình cmt"), (19, 2, 1, "Vinh cmt"), (20, 2, 2, "Vinh cmt"), (21, 2, 3, "Vinh cmt"), (22, 2, 4, "Vinh cmt"), (23, 2, 5, "Vinh cmt"), (24, 2, 6, "Vinh cmt"), (25, 2, 7, "Vinh cmt"), (26, 2, 8, "Vinh cmt"), (27, 2, 9, "Vinh cmt"), (28, 2, 10, "Vinh cmt"), (29, 2, 11, "Vinh cmt"), (30, 2, 12, "Vinh cmt"), (31, 2, 13, "Vinh cmt"), (32, 2, 14, "Vinh cmt"), (33, 2, 15, "Vinh cmt"), (34, 2, 16, "Vinh cmt"), (35, 2, 17, "Vinh cmt"), (36, 2, 18, "Vinh cmt"), (37, 3, 1, "Việt cmt"), (38, 3, 2, "Việt cmt"), (39, 3, 3, "Việt cmt"), (40, 3, 4, "Việt cmt"), (41, 3, 5, "Việt cmt"), (42, 3, 6, "Việt cmt"), (43, 3, 7, "Việt cmt"), (44, 3, 8, "Việt cmt"), (45, 3, 9, "Việt cmt"), (46, 3, 10, "Việt cmt"), (47, 3, 11, "Việt cmt"), (48, 3, 12, "Việt cmt"), (49, 3, 13, "Việt cmt"), (50, 3, 14, "Việt cmt"), (51, 3, 15, "Việt cmt"), (52, 3, 16, "Việt cmt"), (53, 3, 17, "Việt cmt"), (54, 3, 18, "Việt cmt"), (55, 4, 1, "Kiên cmt"), (56, 4, 2, "Kiên cmt"), (57, 4, 3, "Kiên cmt"), (58, 4, 4, "Kiên cmt"), (59, 4, 5, "Kiên cmt"), (60, 4, 6, "Kiên cmt"), (61, 4, 7, "Kiên cmt"), (62, 4, 8, "Kiên cmt"), (63, 4, 9, "Kiên cmt"), (64, 4, 10, "Kiên cmt"), (65, 4, 11, "Kiên cmt"), (66, 4, 12, "Kiên cmt"), (67, 4, 13, "Kiên cmt"), (68, 4, 14, "Kiên cmt"), (69, 4, 15, "Kiên cmt"), (70, 4, 16, "Kiên cmt"), (71, 4, 17, "Kiên cmt"), (72, 4, 18, "Kiên cmt"), (73, 5, 1, "Tuấn cmt"), (74, 5, 2, "Tuấn cmt"), (75, 5, 3, "Tuấn cmt"), (76, 5, 4, "Tuấn cmt"), (77, 5, 5, "Tuấn cmt"), (78, 5, 6, "Tuấn cmt"), (79, 5, 7, "Tuấn cmt"), (80, 5, 8, "Tuấn cmt"), (81, 5, 9, "Tuấn cmt"), (82, 5, 10, "Tuấn cmt"), (83, 5, 11, "Tuấn cmt"), (84, 5, 12, "Tuấn cmt"), (85, 5, 13, "Tuấn cmt"), (86, 5, 14, "Tuấn cmt"), (87, 5, 15, "Tuấn cmt"), (88, 5, 16, "Tuấn cmt"), (89, 5, 17, "Tuấn cmt"), (90, 5, 18, "Tuấn cmt"), (91, 6, 1, "Quang cmt"), (92, 6, 2, "Quang cmt"), (93, 6, 3, "Quang cmt"), (94, 6, 4, "Quang cmt"), (95, 6, 5, "Quang cmt"), (96, 6, 6, "Quang cmt"), (97, 6, 7, "Quang cmt"), (98, 6, 8, "Quang cmt"), (99, 6, 9, "Quang cmt"), (100, 6, 10, "Quang cmt"), (101, 6, 11, "Quang cmt"), (102, 6, 12, "Quang cmt"), (103, 6, 13, "Quang cmt"), (104, 6, 14, "Quang cmt"), (105, 6, 15, "Quang cmt"), (106, 6, 16, "Quang cmt"), (107, 6, 17, "Quang cmt"), (108, 6, 18, "Quang cmt");

insert into
    user_follow_user (userSourceId, userTargetId)
values (1, 2), (1, 3), (1, 4);

insert into
    user_react_post (userId, postId)
values (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6);

insert into user_react_post (userId, postId) values (4, 2);