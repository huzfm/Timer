import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
      return (
            <>
                  <footer className="text-sm scrollbar relative  bottom-0 -mt-8 h-16 bg-slate-950 text-center text-white font-mono">
                        Made with{" "}
                        <FontAwesomeIcon className="text-red-700" icon={faHeart} /> by <a href="https://huzaifmushtaq.netlify.app/" target="_blank" className="text-cyan-100">Huzaif Mushtaq</a> | © {new Date().getFullYear()}
                  </footer>
            </>
      );
}