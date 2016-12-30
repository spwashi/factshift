# factshift

This project is in the infancy of its rebirth; I started a while ago with a very naive "cross that bridge when we get there" mentality, and as a result, have had to modify great portions of the codebase to add back the level of flexibility that is going to be required to see this to fruition. I also had a weird proprietary approach to coding, which excluded the idea of using too many plugins or libraries (not that PHP has great library support to begin with), and that resulted in some missing abstraction that I've spent the last several weeks trying to rectify.

That being said, what's here now is the Framework that I've developed for both PHP and JS. The PHP Framework is located in the "Sm" directory, with the project files being located in the "Factshift" directory. Database config info is located in Factshift/Core/drivers/registry.php, and depends upon a MySql database. Visiting the url "/dev/p" should create the tables, but there might need to be some reconfiguring of the Dev Controller to do so. JavaScript files are located in Factshift/public/alpha, and use Factshift/public/alpha/require_config.js to load dependencies. The site has a single point of entry, index.php, which defines an autoloader and routes the URL to proper Controllers that render each page. 