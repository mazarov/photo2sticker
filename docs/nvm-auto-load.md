# Автозагрузка nvm в каждом терминале

Чтобы не вводить `export NVM_DIR=...` и `nvm use` каждый раз, добавь загрузку nvm в свой профиль шелла.

## 1. Узнай, какой у тебя шелл

В терминале выполни:

```bash
echo $SHELL
```

- Если выведет `/bin/zsh` — править нужно **~/.zshrc**
- Если `/bin/bash` — править **~/.bashrc** или **~/.bash_profile**

## 2. Добавь в конец выбранного файла

Открой файл (подставь свой: `.zshrc` или `.bashrc`):

```bash
nano ~/.zshrc
```

или

```bash
nano ~/.bashrc
```

В **конец файла** вставь эти строки:

```bash
# nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# (опционально) в папке с .nvmrc автоматически переключать Node
cd() { builtin cd "$@" && [ -f .nvmrc ] && nvm use 2>/dev/null; }
```

Если не хочешь перехват `cd` — добавь только первые 4 строки (от `# nvm` до `bash_completion`).  
Сохрани: в nano — `Ctrl+O`, Enter, затем `Ctrl+X`.

## 3. Подхвати настройки в текущем терминале

```bash
source ~/.zshrc
```

или

```bash
source ~/.bashrc
```

## 4. Проверь

Открой **новое** окно терминала, выполни:

```bash
nvm use
node -v
cd /Users/azarovmaxim/photo2sticker-bot/landing
npm run dev:client
```

Дальше при каждом новом терминале nvm будет загружаться сам. В каталоге с `.nvmrc` (например `landing`) после `cd` будет автоматически выполняться `nvm use`.
