const Footer = () => {
    return (
      <div className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Pizza Shop. All Rights Reserved.
          </p>
          <div className="mt-4">
            <a href="/terms" className="text-sm text-gray-400 hover:text-white mx-2">
              Terms & Conditions
            </a>
            <a href="/privacy" className="text-sm text-gray-400 hover:text-white mx-2">
              Privacy Policy
            </a>
          </div>
          <div className="mt-4">
            <p className="text-sm">
              Contact us: <span className="text-gray-400">info@pizzashop.com</span>
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Footer;