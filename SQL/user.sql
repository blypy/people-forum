-- 创建带盐值的用户表
CREATE TABLE user (
                             id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                             username VARCHAR(50) UNIQUE NOT NULL COMMENT '用户名',
                             email VARCHAR(100) UNIQUE NOT NULL COMMENT '邮箱',
                             salt CHAR(10) NOT NULL COMMENT '盐值', -- 新增盐值字段
                             password CHAR(32) NOT NULL COMMENT 'MD5(密码+salt)',
                             status TINYINT(1) DEFAULT 1 COMMENT '状态(1活跃/0封禁)',
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             last_login TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 插入用户示例（密码123456会被加密存储）
INSERT INTO user (username, email, salt, password)
VALUES (
           '狗蛋',
           'goudan@666.com',
           SUBSTRING(MD5(RAND()), 1, 10), -- 生成10位随机盐
           MD5(CONCAT('123456', salt)) -- 密码拼接盐值后加密
       );

-- 登录验证SQL
SELECT * FROM user
WHERE username = '狗蛋'
  AND password = MD5(CONCAT('输入的密码', salt))
  AND status = 1; -- 只允许活跃用户登录

-- 封禁用户操作示例
UPDATE user SET status = 0 WHERE id = 1;