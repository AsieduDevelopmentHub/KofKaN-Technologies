class MyHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<header data-aos="fade-in">
        <a href="index.html">
            <div class="company" data-aos="fade-right">
                <img src="img/logo.jpg" alt="logo" class="logo">
                <div class="comName">
                    <h1>KofKaN</h1>
                    <h3>Technologies</h3>
                </div>
            </div>
        </a>
        <nav>
            <ul id="navLinks" data-aos="fade-left">
                <li class="searchBar">
                    <input type="search" id="search" placeholder="Enter keyword....">
                    <i class="fas fa-search"></i>
                </li>
                <li><a href="index.html"><i class="fas fa-home"></i>HOME</a></li>
                <li><a href="about.html"><i class="fas fa-circle-info"></i>ABOUT</a></li>
                <li><a href="services.html"><i class="fas fa-handshake"></i>SERVICES</a></li>
                <li><a href="projects.html"><i class="fas fa-code"></i>PROJECTS</a></li>
                <li><a href="https://shop.kofkantechnologies.com/"><i class="fas fa-shopping-bag"></i>SHOP</a></li>
                <li><a href="contact-us.html"><i class="fas fa-phone"></i>CONTACT</a></li>
            </ul>
        </nav>
         <div class="miniNav" data-aos="fade-left">
            <i class="fas fa-search" id="searchIcon" onclick="showMenu()"></i>
            <a href="https://shop.kofkantechnologies.com/"><i class="fas fa-shopping-bag" id="cartBag"></i></a>
            <i class="fas fa-bars-staggered" id="menu" onclick="showMenu()"></i>
        </div>
    </header>
    <div class="overlay" id="overlay" onclick="showMenu()"></div>
`;

    // Responsive menu toggle
    setTimeout(() => {
      const menuIcon = this.querySelector('#menu');
      const navLinks = this.querySelector('#navLinks');
      if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
          navLinks.classList.toggle('open');
        });
      }
    }, 0);
  }
}
customElements.define('my-header', MyHeader);

class MyFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<footer data-aos="fade-up">
        <div class="stR">
        <div class="branding" data-aos="fade-left">
            <img src="img/logo.jpg" alt="logo" class="logo">
            <p>"Innovating through Mechatronics & intelligent Systems"</p>
        </div>
        <div class="newsletter" data-aos="fade-right">
            <h3>Newsletter</h3>
            <label for="email">Email</label>
            <input type="email" name="email" id="email" placeholder="youremail@mail.com" required>
            <button type="submit" onclick="SubmitNews()">Subscribe</button>
        </div>
        </div>
        <div class="siteLinks" data-aos="zoom-in">
            <div class="companyLinks">
                <h3>Company</h3>
                <ul>
                    <li><a href="about.html"><i class="fas fa-circle-info"></i>About</a></li>
                    <li><a href="services.html"><i class="fas fa-handshake-angle"></i>Services</a></li>
                    <li><a href="projects.html"><i class="fas fa-code"></i>Projects</a></li>
                    <li><a href="contact-us.html"><i class="fas fa-phone"></i>Contact Us</a></li>
                </ul>
            </div>
            <div class="supportLinks">
                <h3>Support</h3>
                <ul>
                    <li><a href=""><i class="fas fa-question"></i>FAQs</a></li>
                    <li><a href=""><i class="fas fa-lock"></i>Privacy Policy</a></li>
                    <li><a href=""><i class="fas fa-gavel"></i>Terms of Service</a></li>
                </ul>
            </div>
            <div class="shopLinks">
                <h3>Shop</h3>
                <ul>
                    <li><a href="https://shop.kofkantechnologies.com/"><i class="fas fa"></i>All Products</a></li>
                    <li><a href="https://shop.kofkantechnologies.com/pages/checkout.html"><i class="fas fa"></i>Checkout</a></li>
                    <li><a href="https://shop.kofkantechnologies.com/pages/order.html"><i class="fas fa"></i>Track Order</a></li>
                </ul>
            </div>          
        </div>
       
        <div class="socialMedia">
            <a href="wa.me/233550783777"><i class="fab fa-whatsapp"></i></a>
            <i class="fab fa-linkedin-in"></i>
            <i class="fab fa-facebook-f"></i>
            <i class="fab fa-github"></i>
        </div>       
        <div class="copyright">
            <kbd>&copy 2025 KofKaN Technologies. All rights reserved.</kbd>
        </div> 
    </footer>`;
  }
}
customElements.define('my-footer', MyFooter);

