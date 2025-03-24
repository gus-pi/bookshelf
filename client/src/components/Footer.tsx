const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-black text-base-content p-4">
      <aside>
        <p className="font-extralight">
          Copyright © {new Date().getFullYear()} - All rights reserved by
          Gustavo Pinedo
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
