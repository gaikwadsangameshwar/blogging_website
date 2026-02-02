import { Github, Linkedin,Home  } from "lucide-react";


export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-2xl font-bold text-sky-400">
            Sangam Blogs
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Sharing thoughts, tutorials, and real-world web development
            experiences.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-sky-400 transition">
               <Home size={24} className="text-gray-700 hover:text-indigo-600 transition" />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Follow Me
          </h3>
          <div className="flex gap-4 text-sm">
            <a
              href="https://github.com/gaikwadsangameshwar"
              target="_blank"
              className="hover:text-sky-400 transition"
            >
             <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/sangameshwar-gaikwad-a83426340"
              target="_blank"
              className="hover:text-sky-400 transition"
            >
                <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Sangam Gaikwad. All rights reserved.
      </div>
    </footer>
  );
}
