# dsh-workbench

[English](README.md) | 简体中文

一个面向 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)、由社区独立维护的实验性插件工作台。

## 当前状态

本仓库已经包含有效的 Cordis 插件入口和可安装的 DeepSeek Harness bundle 清单。在第一个具体功能确定之前，插件不会注册工具、服务、事件或模型上下文，也不会执行运行时 I/O。

项目尚无稳定版本，`@geecraft23/dsh-workbench` 也未发布到 npm。请勿将它加入生产 profile。

## 开发基线

- DeepSeek Harness `0.1.2-alpha.4`
- `@deepseek-ai/cordis` `^4.0.2`
- Node.js `^22.19.0 || >=24.0.0`
- pnpm `11.7.0`

DeepSeek Harness 仍处于预发布开发阶段。本项目只对测试和 CI 实际覆盖的版本作兼容性声明。

## 项目结构

| 路径 | 用途 |
| --- | --- |
| [`src/index.ts`](src/index.ts) | 使用命名导出的 Cordis 插件入口 |
| [`cordis.patch.yml`](cordis.patch.yml) | 将本包挂载进 Harness profile 的 bundle 配置层 |
| [`tests/`](tests) | 生命周期、Loader 组合和 bundle 清单检查 |
| [`.github/workflows/ci.yml`](.github/workflows/ci.yml) | 在受支持 Node.js 版本上执行可复现验证 |

本包通过命名导出提供 `name` 和 `apply`，不提供 CLI，也不自行启动 Harness 应用；受支持的应用仍统一通过 `dsh` profile 启动。

## 开发

准备受支持的 Node.js 版本和 pnpm `11.7.0`，然后执行：

```sh
pnpm install --frozen-lockfile
pnpm run verify
pnpm run pack:check
```

`verify` 会依次执行代码检查、严格 TypeScript 检查、逐文件覆盖率测试、构建、产物入口冒烟测试和包发布结构验证。`pack:check` 只展示将进入发布包的文件，不会发布任何内容。

bundle 清单已经支持 Harness 插件管理器从 Git 仓库安装，`prepare` 脚本会为该路径构建 TypeScript 源码。从源码安装会在安装阶段执行包内代码；允许构建前应审查源码并固定到具体 commit。插件具备实际用途后再补充用户安装说明。

## 运行时与数据影响

当前插件不会访问文件、网络、进程、凭据、遥测或持久化数据。它不会增加模型可见文本或工具 schema，因此没有直接的 token 或 KV Cache 影响。后续变更若引入这些行为，必须同时说明权限、数据流、失败行为、生命周期清理、测试和模型影响。

## 贡献与支持

提交 Pull Request 前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。公开缺陷和功能建议请使用 [GitHub Issues](https://github.com/geecraft23/dsh-workbench/issues)。安全漏洞请按照 [SECURITY.md](SECURITY.md) 私下报告。

## 许可证与独立性

本项目使用 [MIT License](LICENSE)。

`dsh-workbench` 是第三方项目，与 DeepSeek 不存在隶属、维护或背书关系。
