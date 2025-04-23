import { CardTemplate } from "@/types/types";

export const cardTemplates: CardTemplate[] = [
  {
    id: "wedding-elegant",
    name: "Elegant Wedding",
    thumbnail: "/public/widding/widding-elegant-bg.jpg",
    backgroundImage: "/public/widding/widding-elegant-bg.jpg",
    description: "A sophisticated, elegant wedding invitation with classic typography",
    category: "wedding",
    content: `
      <div style="text-align: center; min-height: 100vh; background-image: url('/public/widding/widding-elegant-bg.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; align-items: center; justify-content: center;">
        <div style="padding: 40px; margin: 20px; width: 100%; max-width: 800px;">
          <h1 id="block-h1-0" style="color: #a389f4; font-family: 'Georgia', serif; font-size: 32px; margin-bottom: 20px;">You're Invited</h1>
          <p id="block-p-0" style="font-size: 18px; margin-bottom: 30px;">Please join us to celebrate</p>
          <h2 id="block-h2-0" style="font-family: 'Georgia', serif; font-size: 26px; margin-bottom: 20px;">Jerry & Jayson's Wedding</h2>
          <p id="block-p-1" style="font-size: 16px; margin-bottom: 10px;">Saturday, April 19th, 2025 at 8:00 PM</p>
          <p id="block-p-2" style="font-size: 16px; margin-bottom: 30px;">The Grand Hotel, Gulshan Dhaka</p>
          <p id="block-p-3" style="font-style: italic; color: #666;">Dinner and dancing to follow</p>
        </div>
      </div>
    `
  },
  {
    id: "wedding-vintage",
    name: "Vintage Wedding",
    thumbnail: "/public/widding/widding-vintage-bg.jpg",
    backgroundImage: "/public/widding/widding-vintage-bg.jpg",
    description: "A vintage-inspired wedding invitation with a romantic feel",
    category: "wedding",
    content: `
      <div style="text-align: center; min-height: 100vh; background-image: url('/public/widding/widding-vintage-bg.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; align-items: center; justify-content: center;">
        <div style="padding: 40px; margin: 20px; width: 100%; max-width: 800px; background-color: rgba(255, 255, 255, 0.9); border-radius: 12px;">
          <h1 id="block-h1-0" style="color: #d2b48c; font-family: 'Great Vibes', cursive; font-size: 40px; margin-bottom: 20px;">Join Us</h1>
          <p id="block-p-0" style="font-size: 18px; margin-bottom: 30px; color: #333;">In celebrating the union of</p>
          <h2 id="block-h2-0" style="font-family: 'Great Vibes', cursive; font-size: 32px; margin-bottom: 20px; color: #d2b48c;">Emma & John</h2>
          <p id="block-p-1" style="font-size: 16px; margin-bottom: 10px;">Sunday, May 10th, 2025 at 5:00 PM</p>
          <p id="block-p-2" style="font-size: 16px; margin-bottom: 30px;">The Vintage Garden, Banani</p>
          <p id="block-p-3" style="font-style: italic; color: #666;">Cocktails and reception to follow</p>
        </div>
      </div>
    `
  },
  {
    id: "wedding-modern",
    name: "Modern Wedding",
    thumbnail: "/public/widding/widding.jpg",
    backgroundImage: "/public/widding/widding.jpg",
    description: "A modern and minimalistic wedding invitation",
    category: "wedding",
    content: `
      <div style="text-align: center; min-height: 100vh; background-image: url('/public/widding/widding.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; align-items: center; justify-content: center;">
        <div style="padding: 40px; margin: 20px; width: 100%; max-width: 800px; background-color: rgba(0, 0, 0, 0.8); border-radius: 12px;">
          <h1 id="block-h1-0" style="color: #ffffff; font-family: 'Montserrat', sans-serif; font-size: 36px; margin-bottom: 20px;">Save the Date</h1>
          <p id="block-p-0" style="font-size: 18px; margin-bottom: 30px; color: #ddd;">You are cordially invited to the wedding of</p>
          <h2 id="block-h2-0" style="font-family: 'Montserrat', sans-serif; font-size: 30px; margin-bottom: 20px; color: #ffffff;">Alice & Bob</h2>
          <p id="block-p-1" style="font-size: 16px; margin-bottom: 10px; color: #ddd;">Saturday, June 21st, 2025 at 6:00 PM</p>
          <p id="block-p-2" style="font-size: 16px; margin-bottom: 30px; color: #ddd;">The Modern Loft, Dhanmondi</p>
          <p id="block-p-3" style="font-style: italic; color: #aaa;">Formal attire requested</p>
        </div>
      </div>
    `
  },
  {
    id: "birthday-fun",
    name: "Fun Birthday",
    thumbnail: "/public/birthday/birthday-fun-bg.jpg",
    backgroundImage: "/public/birthday/birthday-fun-bg.jpg",
    description: "A colorful, playful birthday invitation with festive elements",
    category: "birthday",
    content: `
      <div style="text-align: center; min-height: 100vh; background-image: url('/public/birthday/birthday-fun-bg.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; align-items: center; justify-content: center;">
        <div style="padding: 40px; margin: 20px; width: 100%; max-width: 800px; background-color: rgba(255, 255, 255, 0.8); border-radius: 12px;">
          <h1 id="block-h1-0" style="color: #ff6b6b; font-family: 'Comic Sans MS', cursive; font-size: 38px; margin-bottom: 15px;">It's Party Time!</h1>
          <p id="block-p-0" style="font-size: 20px; margin-bottom: 20px; color: #5a67d8;">You're invited to celebrate</p>
          <h2 id="block-h2-0" style="font-family: 'Comic Sans MS', cursive; font-size: 32px; margin-bottom: 15px; color: #ff6b6b;">Sarah's 30th Birthday</h2>
          <p id="block-p-1" style="font-size: 18px; margin-bottom: 10px;">Friday, May 16th, 2025 at 7:00 PM</p>
          <p id="block-p-2" style="font-size: 18px; margin-bottom: 20px;">Skyline Lounge, Downtown</p>
          <p id="block-p-3" style="font-weight: bold; color: #5a67d8;">Food, drinks & fun guaranteed!</p>
        </div>
      </div>
    `
  },
  {
    id: "birthday-kids",
    name: "Kids Birthday",
    thumbnail: "/public/birthday/birthday-kids-bg.jpg",
    backgroundImage: "/public/birthday/birthday-kids-bg.jpg",
    description: "A bright and cheerful birthday invitation for kids",
    category: "birthday",
    content: `
      <div style="text-align: center; min-height: 100vh; background-image: url('/public/birthday/birthday-kids-bg.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; align-items: center; justify-content: center;">
        <div style="padding: 40px; margin: 20px; width: 100%; max-width: 800px; background-color: rgba(255, 255, 255, 0.9); border-radius: 12px;">
          <h1 id="block-h1-0" style="color: #ff9f1c; font-family: 'Bubblegum Sans', cursive; font-size: 42px; margin-bottom: 15px;">Happy Birthday!</h1>
          <p id="block-p-0" style="font-size: 20px; margin-bottom: 20px; color: #4a90e2;">Come join the fun</p>
          <h2 id="block-h2-0" style="font-family: 'Bubblegum Sans', cursive; font-size: 34px; margin-bottom: 15px; color: #ff9f1c;">Timmy's 5th Birthday</h2>
          <p id="block-p-1" style="font-size: 18px; margin-bottom: 10px;">Saturday, April 26th, 2025 at 2:00 PM</p>
          <p id="block-p-2" style="font-size: 18px; margin-bottom: 20px;">Funland Park, Mirpur</p>
          <p id="block-p-3" style="font-weight: bold; color: #4a90e2;">Games, cake, and lots of surprises!</p>
        </div>
      </div>
    `
  },
  {
    id: "birthday-elegant",
    name: "Elegant Birthday",
    thumbnail: "/public/birthday/birthday-elegant-bg.jpg",
    backgroundImage: "/public/birthday/birthday-elegant-bg.jpg",
    description: "An elegant and sophisticated birthday invitation",
    category: "birthday",
    content: `
      <div style="text-align: center; min-height: 100vh; background-image: url('/public/birthday/birthday-elegant-bg.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; align-items: center; justify-content: center;">
        <div style="padding: 40px; margin: 20px; width: 100%; max-width: 800px; background-color: rgba(255, 255, 255, 0.9); border-radius: 12px;">
          <h1 id="block-h1-0" style="color: #2e2e2e; font-family: 'Playfair Display', serif; font-size: 38px; margin-bottom: 15px;">Celebrate with Us</h1>
          <p id="block-p-0" style="font-size: 20px; margin-bottom: 20px; color: #777;">You are invited to</p>
          <h2 id="block-h2-0" style="font-family: 'Playfair Display', serif; font-size: 32px; margin-bottom: 15px; color: #2e2e2e;">Michael's 40th Birthday</h2>
          <p id="block-p-1" style="font-size: 18px; margin-bottom: 10px;">Saturday, June 7th, 2025 at 7:00 PM</p>
          <p id="block-p-2" style="font-size: 18px; margin-bottom: 20px;">The Royal Ballroom, Gulshan</p>
          <p id="block-p-3" style="font-style: italic; color: #777;">Black tie optional</p>
        </div>
      </div>
    `
  },
  {
    id: "business-professional",
    name: "Professional Event",
    thumbnail: "/public/business/business-professional-bg.jpg",
    backgroundImage: "/public/business/business-professional-bg.jpg",
    description: "A clean, professional design for corporate events and announcements",
    category: "business",
    content: `
      <div style="text-align: left; min-height: 100vh; background-image: url('/public/business/business-professional-bg.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; align-items: center; justify-content: center;">
        <div style="padding: 50px; margin: 20px; width: 100%; max-width: 800px; background-color: rgba(255, 255, 255, 0.9); box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <h1 id="block-h1-0" style="color: #2c3e50; font-family: 'Arial', sans-serif; font-size: 28px; margin-bottom: 20px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">QUARTERLY BUSINESS MEETING</h1>
          <p id="block-p-0" style="font-size: 16px; margin-bottom: 30px; color: #7f8c8d;">Atlas Corporation invites you to our Q2 Review</p>
          <h2 id="block-h2-0" style="font-family: 'Arial', sans-serif; font-size: 22px; margin-bottom: 20px; color: #2c3e50;">Strategic Direction & Financial Performance</h2>
          <p id="block-p-1" style="font-size: 15px; margin-bottom: 10px;">Thursday, June 12th, 2025 at 10:00 AM</p>
          <p id="block-p-2" style="font-size: 15px; margin-bottom: 30px;">Atlas Headquarters, Conference Room A</p>
          <p id="block-p-3" style="font-style: normal; color: #7f8c8d;">Please RSVP by June 5th • Lunch will be provided</p>
        </div>
      </div>
    `
  },
  {
    id: "business-casual",
    name: "Casual Meeting",
    thumbnail: "/public/business/business-casual-bg.jpg",
    backgroundImage: "/public/business/business-casual-bg.jpg",
    description: "A relaxed and friendly design for informal business meetings",
    category: "business",
    content: `
      <div style="text-align: left; min-height: 100vh; background-image: url('/public/business/business-casual-bg.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; align-items: center; justify-content: center;">
        <div style="padding: 50px; margin: 20px; width: 100%; max-width: 800px; background-color: rgba(255, 255, 255, 0.9); box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <h1 id="block-h1-0" style="color: #2c3e50; font-family: 'Roboto', sans-serif; font-size: 28px; margin-bottom: 20px; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">Team Building Session</h1>
          <p id="block-p-0" style="font-size: 16px; margin-bottom: 30px; color: #7f8c8d;">Join us for a day of team-building activities</p>
          <h2 id="block-h2-0" style="font-family: 'Roboto', sans-serif; font-size: 22px; margin-bottom: 20px; color: #2c3e50;">Collaboration & Communication Workshop</h2>
          <p id="block-p-1" style="font-size: 15px; margin-bottom: 10px;">Friday, July 18th, 2025 at 9:00 AM</p>
          <p id="block-p-2" style="font-size: 15px; margin-bottom: 30px;">Green Park, Banani</p>
          <p id="block-p-3" style="font-style: normal; color: #7f8c8d;">Casual attire • Lunch and snacks included</p>
        </div>
      </div>
    `
  },
  {
    id: "business-formal",
    name: "Formal Meeting",
    thumbnail: "/public/business/business-formal-bg.jpg",
    backgroundImage: "/public/business/business-formal-bg.jpg",
    description: "A formal and sophisticated design for important business meetings",
    category: "business",
    content: `
      <div style="text-align: left; min-height: 100vh; background-image: url('/public/business/business-formal-bg.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; display: flex; align-items: center; justify-content: center;">
        <div style="padding: 50px; margin: 20px; width: 100%; max-width: 800px; background-color: rgba(255, 255, 255, 0.9); box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <h1 id="block-h1-0" style="color: #2c3e50; font-family: 'Times New Roman', serif; font-size: 28px; margin-bottom: 20px; border-bottom: 2px solid #2980b9; padding-bottom: 10px;">ANNUAL SHAREHOLDERS MEETING</h1>
          <p id="block-p-0" style="font-size: 16px; margin-bottom: 30px; color: #7f8c8d;">You are invited to attend our annual shareholders meeting</p>
          <h2 id="block-h2-0" style="font-family: 'Times New Roman', serif; font-size: 22px; margin-bottom: 20px; color: #2c3e50;">Financial Review & Future Outlook</h2>
          <p id="block-p-1" style="font-size: 15px; margin-bottom: 10px;">Wednesday, August 20th, 2025 at 2:00 PM</p>
          <p id="block-p-2" style="font-size: 15px; margin-bottom: 30px;">Corporate Headquarters, Boardroom</p>
          <p id="block-p-3" style="font-style: normal; color: #7f8c8d;">Formal attire required • Refreshments will be served</p>
        </div>
      </div>
    `
  }
]
