import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { config } from "dotenv";

// Load environment variables
config();

const prisma = new PrismaClient();

async function main() {
  // Create Admin User
  const hashedPassword = await hash("admin123", 12);
  
  const admin = await prisma.user.upsert({
    where: { email: "admin@gym.com" },
    update: {},
    create: {
      email: "admin@gym.com",
      name: "Admin User",
      password: hashedPassword,
      role: "ADMIN",
      phone: "+1234567890",
    },
  });

  // Create Regular User
  const userPassword = await hash("user123", 12);
  
  const user = await prisma.user.upsert({
    where: { email: "user@gym.com" },
    update: {},
    create: {
      email: "user@gym.com",
      name: "John Doe",
      password: userPassword,
      role: "USER",
      phone: "+1234567891",
    },
  });

  // Create Trainers
  const trainers = await Promise.all([
    prisma.trainer.create({
      data: {
        name: "Mike Johnson",
        email: "mike@gym.com",
        phone: "+1234567892",
        specialization: "Strength Training",
        experience: 8,
        bio: "Certified strength and conditioning specialist with 8 years of experience.",
      },
    }),
    prisma.trainer.create({
      data: {
        name: "Sarah Williams",
        email: "sarah@gym.com",
        phone: "+1234567893",
        specialization: "Yoga & Flexibility",
        experience: 6,
        bio: "Yoga instructor and flexibility coach helping clients achieve balance.",
      },
    }),
    prisma.trainer.create({
      data: {
        name: "David Chen",
        email: "david@gym.com",
        phone: "+1234567894",
        specialization: "HIIT & Cardio",
        experience: 5,
        bio: "High-intensity interval training expert focused on fat loss and endurance.",
      },
    }),
  ]);

  // Create Membership Plans
  const plans = await Promise.all([
    prisma.membershipPlan.create({
      data: {
        name: "Basic",
        description: "Perfect for beginners",
        price: 29.99,
        duration: 30,
        features: JSON.stringify([
          "Access to gym equipment",
          "Locker room access",
          "Free fitness assessment",
        ]),
        isPopular: false,
      },
    }),
    prisma.membershipPlan.create({
      data: {
        name: "Standard",
        description: "Most popular choice",
        price: 59.99,
        duration: 30,
        features: JSON.stringify([
          "All Basic features",
          "Group classes included",
          "1 personal training session",
          "Nutrition consultation",
        ]),
        isPopular: true,
      },
    }),
    prisma.membershipPlan.create({
      data: {
        name: "Premium",
        description: "Ultimate fitness experience",
        price: 99.99,
        duration: 30,
        features: JSON.stringify([
          "All Standard features",
          "Unlimited personal training",
          "Custom meal plans",
          "Priority class booking",
          "Sauna & spa access",
        ]),
        isPopular: false,
      },
    }),
  ]);

  // Create Testimonials
  await Promise.all([
    prisma.testimonial.create({
      data: {
        name: "Emily Rodriguez",
        rating: 5,
        content: "This gym transformed my life! The trainers are incredibly supportive and the facilities are top-notch.",
        position: "Member since 2023",
      },
    }),
    prisma.testimonial.create({
      data: {
        name: "James Wilson",
        rating: 5,
        content: "Best investment I've made in my health. Lost 30 pounds and gained so much confidence!",
        position: "Member since 2022",
      },
    }),
  ]);

  // Create Events
  await Promise.all([
    prisma.event.create({
      data: {
        title: "Summer Fitness Challenge",
        description: "8-week transformation program with prizes for top performers",
        date: new Date("2024-06-01"),
        location: "Main Gym Floor",
        category: "Challenge",
      },
    }),
    prisma.event.create({
      data: {
        title: "Yoga Workshop",
        description: "Learn advanced yoga techniques with our expert instructors",
        date: new Date("2024-05-15"),
        location: "Yoga Studio",
        category: "Workshop",
      },
    }),
  ]);

  // Create Class Schedules
  const schedules = [
    { className: "Morning Yoga", instructor: "Sarah Williams", dayOfWeek: 1, startTime: "07:00", endTime: "08:00", capacity: 20 },
    { className: "HIIT Training", instructor: "David Chen", dayOfWeek: 1, startTime: "18:00", endTime: "19:00", capacity: 15 },
    { className: "Strength & Conditioning", instructor: "Mike Johnson", dayOfWeek: 2, startTime: "06:00", endTime: "07:00", capacity: 12 },
    { className: "Spinning Class", instructor: "Sarah Williams", dayOfWeek: 3, startTime: "17:00", endTime: "18:00", capacity: 25 },
    { className: "CrossFit", instructor: "Mike Johnson", dayOfWeek: 4, startTime: "18:00", endTime: "19:00", capacity: 15 },
    { className: "Evening Yoga", instructor: "Sarah Williams", dayOfWeek: 5, startTime: "19:00", endTime: "20:00", capacity: 20 },
    { className: "Weekend Bootcamp", instructor: "David Chen", dayOfWeek: 6, startTime: "09:00", endTime: "10:30", capacity: 30 },
  ];

  await Promise.all(
    schedules.map((schedule) =>
      prisma.classSchedule.create({
        data: {
          className: schedule.className,
          instructor: schedule.instructor,
          dayOfWeek: schedule.dayOfWeek,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          capacity: schedule.capacity,
          description: `${schedule.className} with ${schedule.instructor}`,
        },
      })
    )
  );

  // Create Gallery Images
  await Promise.all([
    prisma.gallery.create({
      data: {
        title: "Gym Floor",
        image: "/images/gym-floor.jpg",
        category: "Facility",
      },
    }),
    prisma.gallery.create({
      data: {
        title: "Weight Training Area",
        image: "/images/weights.jpg",
        category: "Equipment",
      },
    }),
    prisma.gallery.create({
      data: {
        title: "Cardio Zone",
        image: "/images/cardio.jpg",
        category: "Equipment",
      },
    }),
    prisma.gallery.create({
      data: {
        title: "Group Class",
        image: "/images/class.jpg",
        category: "Classes",
      },
    }),
  ]);

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
