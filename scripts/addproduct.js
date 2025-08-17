const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./kofkantechnologies.json'); // Make sure this path matches your file

initializeApp({
  credential: cert(serviceAccount),
  projectId: 'kofkantechnology',
});

const dbSet = getFirestore();

const products = [
  {
    category: "Arduino Kit",
    img: "https://bitly.cx/C1Rap",
    productName: "Arduino Uno Starter Kit",
    productPrice: 650.00,
    description: "Complete starter kit with Arduino Uno, breadboard, jumper wires, LEDs, and sensors.",
    quantity: "in stock"
  },
  {
    category: "Microcontroller",
    img: "https://bitly.cx/qRyFD",
    productName: "ESP32 Development Board",
    productPrice: 150.00,
    description: "WiFi and Bluetooth enabled ESP32 board for IoT projects.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/BdaTe",
    productName: "DHT11 Temperature & Humidity Sensor",
    productPrice: 80.00,
    description: "Digital sensor for measuring temperature and humidity.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/bYEA5",
    productName: "HC-SR04 Ultrasonic Distance Sensor",
    productPrice: 30.00,
    description: "Ultrasonic sensor for measuring distance up to 4 meters.",
    quantity: "in stock"
  },
  {
    category: "Arduino Kit",
    img: "https://bitly.cx/vW697",
    productName: "Arduino Mega 2560 Kit",
    productPrice: 350.00,
    description: "Advanced kit with Arduino Mega, sensors, and modules for complex projects.",
    quantity: "in stock"
  },
  {
    category: "Microcontroller",
    img: "https://bitly.cx/xS4f",
    productName: "Raspberry Pi Pico",
    productPrice: 180.00,
    description: "Affordable microcontroller board based on RP2040 chip.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/UnKnH",
    productName: "IR Obstacle Avoidance Sensor",
    productPrice: 25.00,
    description: "Infrared sensor for obstacle detection in robotics.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/EL1l",
    productName: "MQ-2 Gas Sensor",
    productPrice: 30.00,
    description: "Sensor for detecting LPG, smoke, and other gases.",
    quantity: "in stock"
  },
  {
    category: "Accessory",
    img: "https://bitly.cx/jc36",
    productName: "Breadboard 830 Points",
    productPrice: 115.00,
    description: "Large breadboard for prototyping circuits.",
    quantity: "in stock"
  },
  {
    category: "Accessory",
    img: "https://bitly.cx/xESew",
    productName: "Jumper Wires (Male to Male, 40pcs)",
    productPrice: 30.00,
    description: "Pack of 40 male-to-male jumper wires for breadboarding.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/8TBu",
    productName: "BMP180 Barometric Pressure Sensor",
    productPrice: 55.00,
    description: "Sensor for measuring atmospheric pressure and altitude.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/22JIk",
    productName: "PIR Motion Sensor",
    productPrice: 35.00,
    description: "Passive infrared sensor for motion detection.",
    quantity: "in stock"
  },
  {
    category: "Microcontroller",
    img: "https://bitly.cx/d7QnY",
    productName: "STM32F103C8T6 Development Board",
    productPrice: 160.00,
    description: "Blue Pill STM32 board for ARM Cortex-M3 projects.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/urjru",
    productName: "Soil Moisture Sensor",
    productPrice: 65.00,
    description: "Sensor for measuring soil moisture in gardening projects.",
    quantity: "in stock"
  },
  {
    category: "Accessory",
    img: "https://bitly.cx/TG3wY",
    productName: "16x2 LCD Display Module",
    productPrice: 45.00,
    description: "Alphanumeric LCD display for Arduino and microcontrollers.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/yZiaY",
    productName: "Photoresistor (LDR) Sensor",
    productPrice: 48.00,
    description: "Light-dependent resistor for light sensing applications.",
    quantity: "in stock"
  },
  {
    category: "Accessory",
    img: "https://bitly.cx/23fdS",
    productName: "Servo Motor SG90",
    productPrice: 49.00,
    description: "Mini servo motor for robotics and automation.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/yyAP4",
    productName: "Flame Sensor Module",
    productPrice: 37.00,
    description: "Sensor for detecting flame and fire.",
    quantity: "in stock"
  },
  {
    category: "Accessory",
    img: "https://bitly.cx/0vmiU",
    productName: "Relay Module 5V",
    productPrice: 16.00,
    description: "Single channel relay module for switching AC/DC loads.",
    quantity: "in stock"
  },
  {
    category: "Microcontroller",
    img: "https://bitly.cx/krGWb",
    productName: "Arduino Nano",
    productPrice: 85.00,
    description: "Compact Arduino board for small projects.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/6sON",
    productName: "Sound Sensor Module",
    productPrice: 52.00,
    description: "Microphone sensor for detecting sound levels.",
    quantity: "in stock"
  },
  {
    category: "Accessory",
    img: "https://bitly.cx/kVuCa",
    productName: "DC Motor 3V-6V",
    productPrice: 14.00,
    description: "Small DC motor for robotics and automation.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/5QnO",
    productName: "Rain Sensor Module",
    productPrice: 24.00,
    description: "Sensor for detecting rain and water drops.",
    quantity: "in stock"
  },
  {
    category: "Accessory",
    img: "https://bitly.cx/II9s",
    productName: "Push Button Switch (Pack of 10)",
    productPrice: 21.00,
    description: "Pack of 10 push button switches for prototyping.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/MDeHx",
    productName: "Tilt Sensor",
    productPrice: 15.00,
    description: "Sensor for detecting tilt and orientation.",
    quantity: "in stock"
  },
  {
    category: "Accessory",
    img: "https://bitly.cx/n4hb3",
    productName: "USB to TTL Converter",
    productPrice: 18.00,
    description: "Module for serial communication with microcontrollers.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/6jRMN",
    productName: "Hall Effect Sensor",
    productPrice: 26.00,
    description: "Sensor for detecting magnetic fields.",
    quantity: "in stock"
  },
  {
    category: "Accessory",
    img: "https://bitly.cx/xOiAK",
    productName: "Stepper Motor 28BYJ-48",
    productPrice: 32.00,
    description: "Stepper motor for precise control in robotics.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/SVTmk",
    productName: "Touch Sensor Module",
    productPrice: 21.00,
    description: "Capacitive touch sensor for interactive projects.",
    quantity: "in stock"
  },
  {
    category: "Accessory",
    img: "https://bitly.cx/sGADt",
    productName: "Micro SD Card Module",
    productPrice: 60.00,
    description: "Module for adding SD card storage to microcontrollers.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/UJdx",
    productName: "Color Sensor TCS3200",
    productPrice: 59.00,
    description: "Sensor for detecting colors in robotics and automation.",
    quantity: "in stock"
  },
  {
    category: "Accessory",
    img: "https://bitly.cx/e7sC",
    productName: "OLED Display 0.96 inch",
    productPrice: 40.00,
    description: "Small OLED display for microcontroller projects.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/0saW4",
    productName: "Vibration Sensor Module",
    productPrice: 32.00,
    description: "Sensor for detecting vibration and movement.",
    quantity: "in stock"
  },
  {
    category: "Accessory",
    img: "https://bitly.cx/xqcu",
    productName: "Power Supply Module 3.3V/5V",
    productPrice: 120.00,
    description: "Power supply module for breadboard and microcontrollers.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/RPJKM",
    productName: "UV Sensor Module",
    productPrice: 60.00,
    description: "Sensor for detecting ultraviolet light.",
    quantity: "in stock"
  },
  {
    category: "Accessory",
    img: "https://bitly.cx/22fF",
    productName: "Potentiometer 10K",
    productPrice: 8.00,
    description: "Variable resistor for adjusting voltage in circuits.",
    quantity: 50
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/gyoAx",
    productName: "Gas Sensor MQ-135",
    productPrice: 45.00,
    description: "Sensor for detecting air quality and gases.",
    quantity: "in stock"
  },
  {
    category: "Accessory",
    img: "https://bitly.cx/0bB3",
    productName: "Battery Holder 2xAA",
    productPrice: 27.00,
    description: "Battery holder for powering projects.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/HHbMQ",
    productName: "Water Level Sensor",
    productPrice: 43.00,
    description: "Sensor for detecting water level in tanks.",
    quantity: "in stock"
  },
  {
    category: "Accessory",
    img: "https://bitly.cx/yq7c",
    productName: "Heat Sink for ICs",
    productPrice: 18.00,
    description: "Small heat sink for cooling integrated circuits.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/ieCF3",
    productName: "Joystick Module",
    productPrice: 78.00,
    description: "Analog joystick for robotics and gaming projects.",
    quantity: "in stock"
  },
  {
    category: "Accessory",
    img: "https://bitly.cx/Udf0h",
    productName: "LED Pack (Red, Green, Blue, Yellow)",
    productPrice: 14.00,
    description: "Pack of 20 assorted LEDs for prototyping.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/PHeMC",
    productName: "Pulse Sensor",
    productPrice: 55.00,
    description: "Sensor for measuring heart rate and pulse.",
    quantity: "in stock"
  },
  {
    category: "Accessory",
    img: "https://bitly.cx/XGHg2",
    productName: "Resistor Pack (100pcs)",
    productPrice: 50.00,
    description: "Pack of 100 resistors of various values.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/8zfvJ",
    productName: "Accelerometer ADXL345",
    productPrice: 70.00,
    description: "3-axis accelerometer for motion sensing.",
    quantity: "in stock"
  },
  {
    category: "Accessory",
    img: "https://bitly.cx/015M",
    productName: "Capacitor Pack (50pcs)",
    productPrice: 45.00,
    description: "Pack of 50 capacitors of various values.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/x2u6",
    productName: "Gyroscope Module MPU-6050",
    productPrice: 110.00,
    description: "6-axis gyroscope and accelerometer module.",
    quantity: "in stock"
  },
  {
    category: "Accessory",
    img: "https://bitly.cx/7vDhL",
    productName: "Diode Pack (50pcs)",
    productPrice: 35.00,
    description: "Pack of 50 general purpose diodes.",
    quantity: "in stock"
  },
  {
    category: "Sensor",
    img: "https://bitly.cx/9AAIS",
    productName: "Barometric Pressure Sensor BMP280",
    productPrice: 58.00,
    description: "Sensor for measuring pressure and altitude.",
    quantity: "in stock"
  },
  {
    category: "Accessory",
    img: "https://bitly.cx/R1l5",
    productName: "Transistor Pack (30pcs)",
    productPrice: 86.00,
    description: "Pack of 30 assorted transistors.",
    quantity: "in stock"
  }
];

async function uploadProducts() {
  try {
    for (const product of products) {
      await dbSet.collection('products').add(product);
      console.log('Added:', product.productName);
    }
    console.log('Done!');
  } catch (err) {
    console.error('Error uploading products:', err);
  }
}

uploadProducts().catch(console.error);
