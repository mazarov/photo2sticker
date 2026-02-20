import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-display font-bold text-white mb-2">
        Страница не найдена
      </h1>
      <p className="text-muted-foreground mb-6 text-center">
        Запрашиваемая страница не существует.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="text-primary hover:underline font-medium"
        >
          На главную
        </Link>
        <Link
          href="/style"
          className="text-primary hover:underline font-medium"
        >
          Каталог стилей
        </Link>
      </div>
    </div>
  );
}
