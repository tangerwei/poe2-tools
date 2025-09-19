# 游戏机制模块结构

## 文件夹结构
```
game-mechanics/
├── index.tsx                    # 游戏机制主目录页面
├── MovementPenalty.tsx          # 移速惩罚机制
├── resistance/                  # 抗性机制（待开发）
│   └── index.tsx
├── damage-calculation/          # 伤害计算（待开发）
│   └── index.tsx
├── skill-gems/                  # 技能宝石系统（待开发）
│   └── index.tsx
├── crafting/                    # 制作系统（待开发）
│   └── index.tsx
├── currency/                    # 通货系统（待开发）
│   └── index.tsx
└── endgame/                     # 终盘机制（待开发）
    └── index.tsx
```

## 添加新机制的步骤

1. 在 `game-mechanics/` 下创建新的文件夹或组件文件
2. 在 `game-mechanics/index.tsx` 中添加新的卡片
3. 在 `App.tsx` 中添加路由配置
4. 更新导入路径

## 命名规范

- 文件夹：使用 kebab-case（如 `damage-calculation`）
- 组件文件：使用 PascalCase（如 `MovementPenalty.tsx`）
- 导出组件：使用 PascalCase（如 `export function MovementPenalty`）