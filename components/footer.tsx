import { Github, Linkedin, Twitter, UserRound } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-6">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between text-gray-400 px-6">
        <p className="text-sm text-center sm:text-left">
          Built with <span className="text-red-500">&#x2665;</span> by Aviral
        </p>
        <ul className="flex gap-6 mt-3 sm:mt-0">
          <li>
            <Link href="https://github.com/aviralsharma07" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-white active:text-gray-500">
              <Github className="h-6 w-6" />
            </Link>
          </li>
          <li>
            <Link href="https://twitter.com/_aviral07" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="transition-colors hover:text-white active:text-gray-500">
              <Twitter className="h-6 w-6" />
            </Link>
          </li>
          <li>
            <Link href="https://linkedin.com/in/aviral07" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-white active:text-gray-500">
              <Linkedin className="h-6 w-6" />
            </Link>
          </li>
          <li>
            <Link href="https://www.aviral.tech" target="_blank" aria-label="Portfolio" className="transition-colors hover:text-white active:text-gray-500">
              <UserRound className="h-6 w-6" />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
