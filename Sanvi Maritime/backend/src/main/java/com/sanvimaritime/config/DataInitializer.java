package com.sanvimaritime.config;

import com.sanvimaritime.entity.*;
import com.sanvimaritime.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final MarineServiceRepository marineServiceRepository;
    private final BlogPostRepository blogPostRepository;
    private final UserRepository userRepository;
    private final CompanySettingRepository companySettingRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(CategoryRepository categoryRepository,
            ProductRepository productRepository,
            MarineServiceRepository marineServiceRepository,
            BlogPostRepository blogPostRepository,
            UserRepository userRepository,
            CompanySettingRepository companySettingRepository,
            PasswordEncoder passwordEncoder) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.marineServiceRepository = marineServiceRepository;
        this.blogPostRepository = blogPostRepository;
        this.userRepository = userRepository;
        this.companySettingRepository = companySettingRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        seedUsers();
        seedCategories();
        seedProducts();
        seedServices();
        seedBlogs();
        seedSettings();
    }

    private void seedUsers() {
        if (!userRepository.existsByEmail("admin@sanvimaritime.com")) {
            User admin = User.builder()
                    .email("admin@sanvimaritime.com")
                    .password(passwordEncoder.encode("AdminPass123!"))
                    .name("Sanvi Admin")
                    .company("Sanvi Maritime Pvt Ltd")
                    .phone("+91-98200-12345")
                    .role(Role.ROLE_ADMIN)
                    .build();
            userRepository.save(admin);
        }

        if (!userRepository.existsByEmail("client@maritime.com")) {
            User user = User.builder()
                    .email("client@maritime.com")
                    .password(passwordEncoder.encode("UserPass123!"))
                    .name("Capt. Rajesh Sharma")
                    .company("Oceanic Fleet Management")
                    .phone("+91-98765-43210")
                    .role(Role.ROLE_USER)
                    .build();
            userRepository.save(user);
        }
    }

    private void seedCategories() {
        if (categoryRepository.count() == 0) {
            List<Category> categories = Arrays.asList(
                    Category.builder().id("main-engine").name("Main Engine & Spare Parts").slug("main-engine")
                            .icon("Engine").image("https://www.sanvimaritime.com/images/Product/SM1.jpg")
                            .description(
                                    "Complete main engine assemblies, cylinder heads, pistons, liners, and fuel injection components.")
                            .build(),
                    Category.builder().id("generator").name("Generator & Spare Parts").slug("generator").icon("Zap")
                            .image("https://www.sanvimaritime.com/images/Product/SM2.jpg")
                            .description(
                                    "Auxiliary diesel generator spares, governors, AVR units, and alternator components.")
                            .build(),
                    Category.builder().id("air-compressor").name("Air Compressor & Spare Parts").slug("air-compressor")
                            .icon("Wind").image("https://www.sanvimaritime.com/images/Product/SM3.jpg")
                            .description(
                                    "Starting air compressors, valves, connecting rods, and automatic pressure controllers.")
                            .build(),
                    Category.builder().id("oil-purifier").name("Oil Purifier & Spare Parts").slug("oil-purifier")
                            .icon("Filter").image("https://www.sanvimaritime.com/images/Product/SM4.jpg")
                            .description(
                                    "HFO/LFO fuel and lube oil centrifugal separators, bowl discs, and operating water valves.")
                            .build(),
                    Category.builder().id("turbocharger").name("Turbocharger & Spare Parts").slug("turbocharger")
                            .icon("Gauge").image("https://www.sanvimaritime.com/images/Product/SM5.jpg")
                            .description("Rotor assemblies, nozzle rings, turbine blades, casing, and bearing units.")
                            .build(),
                    Category.builder().id("hydraulic-motor-pump").name("Hydraulic Motor & Pump")
                            .slug("hydraulic-motor-pump").icon("Activity")
                            .image("https://www.sanvimaritime.com/images/Product/SM6.jpg")
                            .description(
                                    "High-pressure axial piston hydraulic motors, deck winch pumps, and steering gear units.")
                            .build(),
                    Category.builder().id("fresh-water-generator").name("Fresh Water Generator")
                            .slug("fresh-water-generator").icon("Droplets")
                            .image("https://www.sanvimaritime.com/images/Product/SM7.jpg")
                            .description(
                                    "Plate heat exchangers, evaporator titanium plates, distillate pumps, and salinometers.")
                            .build(),
                    Category.builder().id("ac-refrigeration").name("AC & Refrigeration Compressor")
                            .slug("ac-refrigeration").icon("Thermometer")
                            .image("https://www.sanvimaritime.com/images/Product/SM8.jpg")
                            .description(
                                    "Provisions refrigeration units and HVAC compressors for marine climate control.")
                            .build(),
                    Category.builder().id("anchor-chain").name("Anchor & Anchor Chain").slug("anchor-chain")
                            .icon("Anchor").image("https://www.sanvimaritime.com/images/Product/SM9.jpg")
                            .description(
                                    "High-holding power anchors, studlink anchor chains, Kenter shackles, and swivels.")
                            .build(),
                    Category.builder().id("navigation-equipment").name("Navigation Equipment")
                            .slug("navigation-equipment").icon("Compass")
                            .image("https://www.sanvimaritime.com/images/Product/SM10.jpg")
                            .description(
                                    "Marine radar systems, gyrocompasses, ECDIS display units, and AIS transponders.")
                            .build());
            categoryRepository.saveAll(categories);
        }
    }

    private void seedProducts() {
        if (productRepository.count() == 0) {
            Category mainEngineCat = categoryRepository.findById("main-engine").orElse(null);
            Category genCat = categoryRepository.findById("generator").orElse(null);
            Category airCompCat = categoryRepository.findById("air-compressor").orElse(null);
            Category purifierCat = categoryRepository.findById("oil-purifier").orElse(null);
            Category turboCat = categoryRepository.findById("turbocharger").orElse(null);

            List<Product> products = Arrays.asList(
                    Product.builder()
                            .id("prod-101")
                            .partNumber("146623-51102")
                            .title("Plunger Assy, 146623-51102")
                            .category(mainEngineCat)
                            .brand("Yanmar")
                            .condition("Brand New OEM")
                            .availability("In Stock")
                            .location("Kalyan Warehouse")
                            .image("https://www.sanvimaritime.com/images/Product/SM1.jpg")
                            .description(
                                    "High-precision fuel pump plunger assembly for Yanmar marine auxiliary engines. Engineered to exact OEM tolerances for high-pressure injection stability.")
                            .specsJson(
                                    "{\"Model\":\"146623-51102\",\"Compatible Engine\":\"Yanmar 6N18 / 6EY18\",\"Material\":\"Hardened Alloy Steel\",\"Weight\":\"1.4 kg\",\"Certification\":\"GL / DNV Approved\"}")
                            .isNewArrival(true)
                            .isFeatured(true)
                            .build(),

                    Product.builder()
                            .id("prod-102")
                            .partNumber("UG25+")
                            .title("Woodward UG25+ Hydraulic Governor")
                            .category(genCat)
                            .brand("Woodward")
                            .condition("Reconditioned - Inspected")
                            .availability("In Stock")
                            .location("Kalyan Warehouse")
                            .image("https://www.sanvimaritime.com/images/Product/SM2.jpg")
                            .description(
                                    "Microprocessor-controlled hydraulic speed governor for diesel engines and steam turbines. Tested on governor test stand with test certificate.")
                            .specsJson(
                                    "{\"Type\":\"UG25+ Digital\",\"Control\":\"Isochronous / Droop\",\"Output Torque\":\"34 N·m\",\"Operating Temp\":\"-40°C to +85°C\"}")
                            .isNewArrival(true)
                            .isFeatured(true)
                            .build(),

                    Product.builder()
                            .id("prod-103")
                            .partNumber("AMC-30A-M2-31")
                            .title("Air Compressor Controller Type AMC-30A-M2-31")
                            .category(airCompCat)
                            .brand("Tanabe")
                            .condition("Brand New")
                            .availability("In Stock")
                            .location("Kalyan Warehouse")
                            .image("https://www.sanvimaritime.com/images/Product/SM3.jpg")
                            .description(
                                    "Automatic control panel unit for marine starting air compressors. Features digital pressure monitoring, automatic unloader timer, and fault logging.")
                            .specsJson(
                                    "{\"Model\":\"AMC-30A-M2-31\",\"Voltage\":\"220V AC / 24V DC\",\"Protection\":\"IP65 Waterproof\",\"Display\":\"LCD Digital Monitor\"}")
                            .isNewArrival(true)
                            .isFeatured(true)
                            .build(),

                    Product.builder()
                            .id("prod-104")
                            .partNumber("746623-51102")
                            .title("Fuel Pump Assy., 746623-51102")
                            .category(mainEngineCat)
                            .brand("Yanmar")
                            .condition("Brand New OEM")
                            .availability("In Stock")
                            .location("Kalyan Warehouse")
                            .image("https://www.sanvimaritime.com/images/Product/SM4.jpg")
                            .description(
                                    "Complete high pressure fuel injection pump unit assembled with plunger, barrel, and delivery valve assemblies.")
                            .specsJson(
                                    "{\"Assembly Code\":\"746623-51102\",\"Engine Series\":\"Yanmar EY26 / N21\",\"Injection Pressure\":\"85 MPa\"}")
                            .isNewArrival(true)
                            .isFeatured(false)
                            .build(),

                    Product.builder()
                            .id("prod-105")
                            .partNumber("Tanabe H64")
                            .title("Tanabe H64 Starting Air Compressor Unit")
                            .category(airCompCat)
                            .brand("Tanabe Compressor")
                            .condition("Reconditioned - Zero Hours")
                            .availability("In Stock")
                            .location("Kalyan Warehouse")
                            .image("https://www.sanvimaritime.com/images/Product/SM5.jpg")
                            .description(
                                    "2-Stage air cooled electric motor driven main engine starting air compressor complete with intercooler and aftercooler.")
                            .specsJson(
                                    "{\"Capacity\":\"60 m³/h\",\"Working Pressure\":\"30 bar\",\"RPM\":\"1200 RPM\",\"Motor Power\":\"15 kW\"}")
                            .isNewArrival(true)
                            .isFeatured(true)
                            .build(),

                    Product.builder()
                            .id("prod-106")
                            .partNumber("MET18SRC")
                            .title("MET18SRC Turbocharger Complete Unit")
                            .category(turboCat)
                            .brand("Mitsubishi")
                            .condition("Reconditioned OEM")
                            .availability("In Stock")
                            .location("Kalyan Warehouse")
                            .image("https://www.sanvimaritime.com/images/Product/SM6.jpg")
                            .description(
                                    "High efficiency exhaust gas turbocharger for medium speed diesel auxiliary engines. Dynamic balancing report included.")
                            .specsJson(
                                    "{\"Model\":\"MET18SRC\",\"Max Temp\":\"650°C\",\"Balancing Standard\":\"ISO 1940 G2.5\"}")
                            .isNewArrival(true)
                            .isFeatured(false)
                            .build(),

                    Product.builder()
                            .id("prod-107")
                            .partNumber("RH133")
                            .title("IHI RH133 Turbocharger Cartridge / Rotor")
                            .category(turboCat)
                            .brand("IHI")
                            .condition("Brand New")
                            .availability("In Stock")
                            .location("Kalyan Warehouse")
                            .image("https://www.sanvimaritime.com/images/Product/SM7.jpg")
                            .description(
                                    "Complete central housing rotating assembly (CHRA) including shaft, turbine wheel, compressor wheel, and bearings.")
                            .specsJson(
                                    "{\"Model\":\"RH133-11100\",\"Type\":\"Radial Turbine\",\"RPM Max\":\"68,000 RPM\"}")
                            .isNewArrival(false)
                            .isFeatured(true)
                            .build(),

                    Product.builder()
                            .id("prod-108")
                            .partNumber("746623-53351")
                            .title("Valve assy, Injection, 746623-53351")
                            .category(mainEngineCat)
                            .brand("Yanmar")
                            .condition("Brand New Genuine")
                            .availability("In Stock")
                            .location("Kalyan Warehouse")
                            .image("https://www.sanvimaritime.com/images/Product/SM8.jpg")
                            .description(
                                    "Complete fuel injection valve nozzle holder assembly for Yanmar N21 and EY22 diesel engines.")
                            .specsJson(
                                    "{\"Part Number\":\"746623-53351\",\"Opening Pressure\":\"32.0 MPa\",\"Application\":\"Auxiliary Engine Fuel Injection\"}")
                            .isNewArrival(true)
                            .isFeatured(false)
                            .build());
            productRepository.saveAll(products);
        }
    }

    private void seedServices() {
        if (marineServiceRepository.count() == 0) {
            List<MarineServiceEntity> services = Arrays.asList(
                    MarineServiceEntity.builder()
                            .id("srv-101")
                            .title("Spare Parts Trading & Supply")
                            .shortDescription(
                                    "Global procurement and fast supply of brand new OEM and reconditioned ship spare parts.")
                            .fullDescription(
                                    "Sanvi Maritime is a prominent ship spare parts supplier based in Kalyan (Mumbai), specializing in trading both brand new OEM and high-grade reconditioned marine spares. We maintain an extensive inventory of main engine spares, generators, air compressors, oil purifiers, and turbochargers, delivering worldwide with full certification.")
                            .image("https://www.sanvimaritime.com/images/Service/SM1.jpg")
                            .icon("PackageCheck")
                            .featuresJson(
                                    "[\"Global Door-to-Deck Delivery\",\"Brand New OEM & Genuine Surplus\",\"Fully Overhauled & Bench-Tested Used Spares\",\"Complete Class Certificates (DNV/GL/ABS/NK)\",\"24/7 Dispatch Readiness\"]")
                            .build(),

                    MarineServiceEntity.builder()
                            .id("srv-102")
                            .title("Engine Overhaul & Technical Service")
                            .shortDescription(
                                    "Expert marine engineering crew for main engine, generator, and turbocharger overhauls.")
                            .fullDescription(
                                    "Our team of chief engineers and certified technicians provides round-the-clock technical overhaul services both in port and riding at sea. From fuel injection pump calibration to complete crankcase inspection and alignment, we ensure maximum vessel uptime.")
                            .image("https://www.sanvimaritime.com/images/Service/SM2.jpg")
                            .icon("Wrench")
                            .featuresJson(
                                    "[\"Main Engine & Auxiliary Engine Overhauling\",\"Governor Testing & Dynamic Calibration\",\"Turbocharger Balancing & Servicing\",\"On-site Emergency Repair Teams\",\"Detailed Condition Assessment Reports\"]")
                            .build(),

                    MarineServiceEntity.builder()
                            .id("srv-103")
                            .title("Reconditioning & Machining Workshops")
                            .shortDescription(
                                    "Precision machining, honing, grinding, and reconditioning of engine cylinder heads, pistons, and valves.")
                            .fullDescription(
                                    "At our specialized machine workshop in Kalyan (Mumbai), we perform high-precision reconditioning of worn engine parts to original factory standards. All reconditioned parts undergo non-destructive testing (NDT), hydraulic pressure testing, and dimensional inspection.")
                            .image("https://www.sanvimaritime.com/images/Service/SM3.jpg")
                            .icon("Settings")
                            .featuresJson(
                                    "[\"Cylinder Liner Honing & Measurement\",\"Piston Crown Re-grooving & Chrome Plating\",\"Valve Seat Grinding & Lapping\",\"Hydraulic Pressure Testing up to 100 Bar\",\"NDT Crack Detection (Dye Penetrant / Ultrasonic)\"]")
                            .build());
            marineServiceRepository.saveAll(services);
        }
    }

    private void seedBlogs() {
        if (blogPostRepository.count() == 0) {
            List<BlogPost> blogs = Arrays.asList(
                    BlogPost.builder()
                            .id("blog-101")
                            .slug("essential-maintenance-guide-for-marine-diesel-generator-fuel-pumps")
                            .title("Essential Maintenance Guide for Marine Diesel Generator Fuel Pumps")
                            .excerpt(
                                    "Learn key inspection steps, calibration tips, and common wear symptoms in 4-stroke auxiliary engine fuel injection pumps.")
                            .content(
                                    "Marine auxiliary generators operate under constant electrical load variations, placing high thermal and mechanical stress on fuel injection pumps and plungers. Timely inspection of plunger clearances, delivery valves, and tappet rollers is crucial to prevent engine misfiring, high exhaust gas temperatures, and fuel dilution in lube oil.\n\n### Key Inspection Checklist:\n1. **Plunger & Barrel Clearance:** Measure micro-clearances during overhaul. Plungers with scoring marks must be replaced immediately with genuine Yanmar or Woodward OEM assemblies.\n2. **Delivery Valve Seating:** Check for pitting on valve seats to ensure crisp cut-off pressure.\n3. **Timing Adjustment:** Verify injection timing after installing reconditioned pump units.\n\nAt Sanvi Maritime, every reconditioned fuel pump unit is bench-tested on fuel calibration rigs before dispatch.")
                            .image("https://www.sanvimaritime.com/images/Blog/SM1.jpg")
                            .author("Eng. Rajesh K. Nair")
                            .date("August 12, 2026")
                            .category("Technical Maintenance")
                            .readTime("5 min read")
                            .build(),

                    BlogPost.builder()
                            .id("blog-102")
                            .slug("how-to-select-between-brand-new-oem-and-reconditioned-ship-spares")
                            .title("How to Select Between Brand New OEM and Reconditioned Ship Spares")
                            .excerpt(
                                    "A practical cost-benefit analysis for vessel superintendents balancing budget constraints and classification society standards.")
                            .content(
                                    "Ship owners and technical managers face a constant balancing act between operating expenditure (OPEX) and vessel reliability. Choosing between brand new OEM spare parts and class-inspected reconditioned parts depends on critical equipment categories, lead times, and remaining vessel operational lifecycle.\n\n### When to Choose Reconditioned Spares:\n- **Large Major Castings:** Cylinder covers, bedplates, and air compressor blocks offer savings up to 60% compared to new items.\n- **Emergency Supply:** Reconditioned units stored in Kalyan warehouse can be dispatched within hours, whereas new OEM items may have 12-week factory lead times.\n\nSanvi Maritime provides class certification and warranty for all reconditioned marine components.")
                            .image("https://www.sanvimaritime.com/images/Blog/SM2.jpg")
                            .author("Sanvi Technical Team")
                            .date("July 28, 2026")
                            .category("Procurement & Logistics")
                            .readTime("7 min read")
                            .build());
            blogPostRepository.saveAll(blogs);
        }
    }

    private void seedSettings() {
        if (!companySettingRepository.existsById("default")) {
            CompanySetting setting = new CompanySetting(
                    "default",
                    "Sanvi Maritime Pvt. Ltd.",
                    "Global Exporter of Genuine OEM & Reconditioned Marine Engine Spare Parts",
                    "Kalyan-Shilphata Road, Dombivli East, Thane, Maharashtra - 421204, India",
                    "Plot No. 42, Sector 8, Alang Ship Breaking Yard, Bhavnagar, Gujarat - 364080",
                    "+91 91679 29096",
                    "+91 98200 12345",
                    "info@sanvimaritime.com",
                    "sales@sanvimaritime.com",
                    "Monday - Saturday: 9:00 AM - 7:00 PM IST",
                    "https://www.facebook.com/profile.php?id=61556703539647",
                    "https://www.linkedin.com/company/sanvi-maritime/",
                    "https://wa.me/919167929096",
                    "https://www.sanvimaritime.com/images/Logo/01.png",
                    "[{\"label\":\"Spares in Inventory\",\"value\":\"15,000+\",\"icon\":\"PackageCheck\"},{\"label\":\"Vessels Equipped\",\"value\":\"850+\",\"icon\":\"Ship\"},{\"label\":\"Global Ports Covered\",\"value\":\"120+\",\"icon\":\"Globe\"},{\"label\":\"Customer Satisfaction\",\"value\":\"99.4%\",\"icon\":\"Award\"}]");
            companySettingRepository.save(setting);
        }
    }
}
