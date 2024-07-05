import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: '00092839291',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// 文件发布管理平台
// 计划  打包 windows =》 上传  这个服务
// v1.1.1 windows tauri  下载  发布 （发布内容）内置 授权

// 登录 注册
// 创建一个team
// 账号或team 创建项目
// 项目内容：
// id， name，框架（tauri，ionic， fitter） 环境 （test，prod）
// 创建授权： accessKey  => 密钥
// 打包完成 上传： projectId 环境test accessKey version  商户： anxin11 平台 windows  file 文件  => accessKey => teamId， userId  fielPath => DB
// public/download/kumao(userid)/plan/test/anxin11/0.0.1/file.apk
// 下载 ： 直接下载某一个文件  下载上一次release版本
// 创建账号
// team
// 创建 project 可以在team 也可以用户上
// 环境 =》 商户  // anxin11 anxin12   => test，prod） 多  表
// 商户 => anxin11  anxin12
// 平台 =projectId  windows

// 商户  id projectId 商户id 名称
// 项目id envid version  0.0.1 平台id Ref 商户id Ref  filePath  isRelease

// user  team

// user    team  user2 user3
// uudi  uuid
// id  plan
// uuid
//
// /seven-auskk2331/plan
// /kumao-00230021/plan2
// // accessKey  => id isTeam
// userId plan
// user
// plan
//
// team
// plan
//
// plan
// id
// user
// userId
// team
// teamId

// user1 team  user2

// user user1
//   1. 23432432
//   2. 23432432
// team team1
//  1. 23432432
//  2. 23432432
//
// =>  account
// sdfdsfds   user1  null  acccessKey[]
// fdssdf   null  team1
//
//
// accessKey
// id accountId => accessKey  dateTime
