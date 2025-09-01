export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold sm:text-5xl">Welcome</h1>
      <p className="mt-4 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-400">
        Build your application with a modern, minimalistic and responsive design using Tailwind CSS.
      </p>
      <a
        href="#get-started"
        className="mt-8 rounded-md bg-gray-900 px-6 py-3 text-white transition-colors hover:bg-gray-700 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
      >
        Get Started
      </a>
    </main>
  );
}
