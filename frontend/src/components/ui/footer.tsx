const Footer = () => {
    return (
<footer className="bg-black text-white w-full py-8">
  <div className="container mx-auto flex flex-col md:flex-row items-center justify-center">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* About Us */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">About Us</h3>
        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam faucibus euismod arcu, sed dapibus diam consequat vel.</p>
      </div>
      
      {/* Contact */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">Contact</h3>
        <address className="text-sm">
          123 Street Name, City, Country<br />
          <a href="mailto:info@company.com">info@company.com</a><br />
          Phone: <a href="tel:+1234567890">+123 456 7890</a>
        </address>
        {/* Subscription form */}
        <form className="mt-4">
          <label className="block mb-2 text-sm" htmlFor="email">Subscribe to our newsletter:</label>
          <div className="flex">
            <input type="email" id="email" name="email" placeholder="Your email address" className="w-full px-3 py-2 mr-2 rounded-md bg-gray-200 text-gray-800 focus:outline-none focus:bg-white" />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out">Subscribe</button>
          </div>
        </form>
      </div>
      
      {/* Site Map */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">Site Map</h3>
        <ul className="text-sm">
          <li><a href="#" className="text-gray-400 hover:text-white transition duration-300 ease-in-out">Home</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition duration-300 ease-in-out">Features</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition duration-300 ease-in-out">Pricing</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition duration-300 ease-in-out">About Us</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white transition duration-300 ease-in-out">Contact</a></li>
        </ul>
      </div>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="border-t border-gray-800 mt-8 pt-4">
    <div className="container mx-auto text-center text-sm">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
      <p>Designed with <span role="img" aria-label="Heart">❤️</span> by Your Team</p>
    </div>
  </div>
</footer>
);
};

export default Footer;
