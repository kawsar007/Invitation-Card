import { CardTemplate } from "@/types/types";

export const cardTemplates: CardTemplate[] = [
  {
    id: "wedding-elegant",
    name: "Elegant Wedding",
    thumbnail: "https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/42d69d3c-5f34-4386-9412-68e6416ecc1f-widding-elegant-bg.jpg",
    backgroundImage: "https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/42d69d3c-5f34-4386-9412-68e6416ecc1f-widding-elegant-bg.jpg",
    description: "A sophisticated, elegant wedding invitation with classic typography",
    category: "wedding",
    content: `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Elegant Wedding Invitation</title>
    <link href="https://fonts.googleapis.com/css2?family=Georgia:wght@400;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Georgia', serif;
            color: #333;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div style="display: flex; align-items: center; justify-content: center; text-align: center; min-height: 100vh; width: 100%; background-image: url('https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/42d69d3c-5f34-4386-9412-68e6416ecc1f-widding-elegant-bg.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; box-sizing: border-box;">
        <div style="padding: min(40px, 5vw); margin: min(20px, 3vw); width: 100%; max-width: 100%; box-sizing: border-box;">
            <h1 id="block-h1-0" style="color: #a389f4; font-family: 'Georgia', serif; font-size: clamp(24px, 5vw, 32px); margin-bottom: max(10px, 2vh);">You're Invited Kawsar</h1>
            <p id="block-p-0" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(15px, 3vh);">Please join us to celebrate</p>
            <h2 id="block-h2-0" style="font-family: 'Georgia', serif; font-size: clamp(20px, 4vw, 26px); margin-bottom: max(10px, 2vh);">Jerry & Jayson's Wedding</h2>
            <p id="block-p-1" style="font-size: clamp(12px, 2.5vw, 16px); margin-bottom: max(5px, 1vh);">Saturday, April 19th, 2025 at 8:00 PM</p>
            <p id="block-p-2" style="font-size: clamp(12px, 2.5vw, 16px); margin-bottom: max(15px, 3vh);">The Grand Hotel, Gulshan Dhaka</p>
            <p id="block-p-3" style="font-style: italic; color: #666; font-size: clamp(12px, 2.5vw, 16px);">Dinner and dancing to follow</p>
        </div>
    </div>
</body>
</html>
    `
  },
  {
    id: "wedding-vintage",
    name: "Vintage Wedding",
    thumbnail: "https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/9a6a6014-f1b2-47a0-a608-db3e45b8bcfd-widding-vintage-bg.jpg",
    backgroundImage: "https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/9a6a6014-f1b2-47a0-a608-db3e45b8bcfd-widding-vintage-bg.jpg",
    description: "A vintage-inspired wedding invitation with a romantic feel",
    category: "wedding",
    content: `
      <div style="display: flex; align-items: center; justify-content: center; text-align: center; min-height: 100vh; width: 100%; background-image: url('https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/9a6a6014-f1b2-47a0-a608-db3e45b8bcfd-widding-vintage-bg.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; box-sizing: border-box;">
        <div style="padding: min(40px, 5vw); margin: min(20px, 3vw); width: 100%; max-width: 100%; border-radius: 12px; box-sizing: border-box;">
          <h1 id="block-h1-0" style="color: #d2b48c; font-family: 'Great Vibes', cursive; font-size: clamp(30px, 6vw, 40px); margin-bottom: max(10px, 2vh);">Join Us</h1>
          <p id="block-p-0" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(15px, 3vh); color: #333;">In celebrating the union of</p>
          <h2 id="block-h2-0" style="font-family: 'Great Vibes', cursive; font-size: clamp(24px, 5vw, 32px); margin-bottom: max(10px, 2vh); color: #d2b48c;">Emma & John</h2>
          <p id="block-p-1" style="font-size: clamp(12px, 2.5vw, 16px); margin-bottom: max(5px, 1vh);">Sunday, May 10th, 2025 at 5:00 PM</p>
          <p id="block-p-2" style="font-size: clamp(12px, 2.5vw, 16px); margin-bottom: max(15px, 3vh);">The Vintage Garden, Banani</p>
          <p id="block-p-3" style="font-style: italic; color: #666; font-size: clamp(12px, 2.5vw, 16px);">Cocktails and reception to follow</p>
        </div>
      </div>
    `
  },
  {
    id: "wedding-modern",
    name: "Modern Wedding",
    thumbnail: "https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/83184adc-d9e9-4bfb-a51d-9b88dd35edbb-widding.jpg",
    backgroundImage: "https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/83184adc-d9e9-4bfb-a51d-9b88dd35edbb-widding.jpg",
    description: "A modern and minimalistic wedding invitation",
    category: "wedding",
    content: `
      <div style="display: flex; align-items: center; justify-content: center; text-align: center; min-height: 100vh; width: 100%; background-image: url('https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/83184adc-d9e9-4bfb-a51d-9b88dd35edbb-widding.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; box-sizing: border-box;">
        <div style="padding: min(40px, 5vw); margin: min(20px, 3vw); width: 100%; max-width: 100%; border-radius: 12px; box-sizing: border-box;">
          <h1 id="block-h1-0" style="color: #111111; font-family: 'Montserrat', sans-serif; font-size: clamp(26px, 5vw, 36px); margin-bottom: max(10px, 2vh);">Save the Date</h1>
          <p id="block-p-0" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(15px, 3vh); color: #111;">You are cordially invited to the wedding of</p>
          <h2 id="block-h2-0" style="font-family: 'Montserrat', sans-serif; font-size: clamp(22px, 4.5vw, 30px); margin-bottom: max(10px, 2vh); color: #111111;">Alice & Bob</h2>
          <p id="block-p-1" style="font-size: clamp(12px, 2.5vw, 16px); margin-bottom: max(5px, 1vh); color: #111;">Saturday, June 21st, 2025 at 6:00 PM</p>
          <p id="block-p-2" style="font-size: clamp(12px, 2.5vw, 16px); margin-bottom: max(15px, 3vh); color: #111;">The Modern Loft, Dhanmondi</p>
          <p id="block-p-3" style="font-style: italic; color: #aaa; font-size: clamp(12px, 2.5vw, 16px);">Formal attire requested</p>
        </div>
      </div>
    `
  },
  {
    id: "birthday-fun",
    name: "Fun Birthday",
    thumbnail: "https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/d8ebd9b5-2fd1-4a13-a4c1-0691161384c1-birthday-fun-bg.jpg",
    backgroundImage: "https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/d8ebd9b5-2fd1-4a13-a4c1-0691161384c1-birthday-fun-bg.jpg",
    description: "A colorful, playful birthday invitation with festive elements",
    category: "birthday",
    content: `
      <div style="display: flex; align-items: center; justify-content: center; text-align: center; min-height: 100vh; width: 100%; background-image: url('https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/d8ebd9b5-2fd1-4a13-a4c1-0691161384c1-birthday-fun-bg.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; box-sizing: border-box;">
        <div style="padding: min(40px, 5vw); margin: min(20px, 3vw); width: 100%; max-width: 100%; background-color: rgba(255, 255, 255, 0.8); border-radius: 12px; box-sizing: border-box;">
          <h1 id="block-h1-0" style="color: #ff6b6b; font-family: 'Comic Sans MS', cursive; font-size: clamp(28px, 5.5vw, 38px); margin-bottom: max(8px, 1.5vh);">It's Party Time!</h1>
          <p id="block-p-0" style="font-size: clamp(15px, 3.2vw, 20px); margin-bottom: max(10px, 2vh); color: #5a67d8;">You're invited to celebrate</p>
          <h2 id="block-h2-0" style="font-family: 'Comic Sans MS', cursive; font-size: clamp(24px, 5vw, 32px); margin-bottom: max(8px, 1.5vh); color: #ff6b6b;">Sarah's 30th Birthday</h2>
          <p id="block-p-1" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(5px, 1vh);">Friday, May 16th, 2025 at 7:00 PM</p>
          <p id="block-p-2" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(10px, 2vh);">Skyline Lounge, Downtown</p>
          <p id="block-p-3" style="font-weight: bold; color: #5a67d8; font-size: clamp(14px, 3vw, 18px);">Food, drinks & fun guaranteed!</p>
        </div>
      </div>
    `
  },
  {
    id: "birthday-kids",
    name: "Kids Birthday",
    thumbnail: "https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/47759fd7-9770-4584-8378-bd20676d495a-birthday-kids-bg.jpg",
    backgroundImage: "https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/47759fd7-9770-4584-8378-bd20676d495a-birthday-kids-bg.jpg",
    description: "A bright and cheerful birthday invitation for kids",
    category: "birthday",
    content: `
      <div style="display: flex; align-items: center; justify-content: center; text-align: center; min-height: 100vh; width: 100%; background-image: url('https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/47759fd7-9770-4584-8378-bd20676d495a-birthday-kids-bg.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; box-sizing: border-box;">
        <div style="padding: min(40px, 5vw); margin: min(20px, 3vw); width: 100%; max-width: 100%; border-radius: 12px; box-sizing: border-box;">
          <h1 id="block-h1-0" style="color: #ff9f1c; font-family: 'Bubblegum Sans', cursive; font-size: clamp(32px, 6vw, 42px); margin-bottom: max(8px, 1.5vh);">Happy Birthday!</h1>
          <p id="block-p-0" style="font-size: clamp(15px, 3.2vw, 20px); margin-bottom: max(10px, 2vh); color: #4a90e2;">Come join the fun</p>
          <h2 id="block-h2-0" style="font-family: 'Bubblegum Sans', cursive; font-size: clamp(26px, 5.2vw, 34px); margin-bottom: max(8px, 1.5vh); color: #ff9f1c;">Timmy's 5th Birthday</h2>
          <p id="block-p-1" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(5px, 1vh);">Saturday, April 26th, 2025 at 2:00 PM</p>
          <p id="block-p-2" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(10px, 2vh);">Funland Park, Mirpur</p>
          <p id="block-p-3" style="font-weight: bold; color: #4a90e2; font-size: clamp(14px, 3vw, 18px);">Games, cake, and lots of surprises!</p>
        </div>
      </div>
    `
  },
  {
    id: "birthday-elegant",
    name: "Elegant Birthday",
    thumbnail: "https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/90614fde-9e92-4022-8231-08695fb06953-birthday-elegant-bg.jpg",
    backgroundImage: "https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/90614fde-9e92-4022-8231-08695fb06953-birthday-elegant-bg.jpg",
    description: "An elegant and sophisticated birthday invitation",
    category: "birthday",
    content: `
      <div style="display: flex; align-items: center; justify-content: center; text-align: center; min-height: 100vh; width: 100%; background-image: url('https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/90614fde-9e92-4022-8231-08695fb06953-birthday-elegant-bg.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; box-sizing: border-box;">
        <div style="padding: min(40px, 5vw); margin: min(20px, 3vw); width: 100%; max-width: 100%; border-radius: 12px; box-sizing: border-box;">
          <h1 id="block-h1-0" style="color: #2e2e2e; font-family: 'Playfair Display', serif; font-size: clamp(28px, 5.5vw, 38px); margin-bottom: max(8px, 1.5vh);">Celebrate with Us</h1>
          <p id="block-p-0" style="font-size: clamp(15px, 3.2vw, 20px); margin-bottom: max(10px, 2vh); color: #777;">You are invited to</p>
          <h2 id="block-h2-0" style="font-family: 'Playfair Display', serif; font-size: clamp(24px, 5vw, 32px); margin-bottom: max(8px, 1.5vh); color: #2e2e2e;">Michael's 40th Birthday</h2>
          <p id="block-p-1" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(5px, 1vh);">Saturday, June 7th, 2025 at 7:00 PM</p>
          <p id="block-p-2" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(10px, 2vh);">The Royal Ballroom, Gulshan</p>
          <p id="block-p-3" style="font-style: italic; color: #777; font-size: clamp(14px, 3vw, 18px);">Black tie optional</p>
        </div>
      </div>
    `
  },
  {
    id: "business-professional",
    name: "Professional Event",
    thumbnail: "https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/8bc10f98-d68d-4092-b873-6a066f04e2e7-business-professional-bg.jpg",
    backgroundImage: "https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/8bc10f98-d68d-4092-b873-6a066f04e2e7-business-professional-bg.jpg",
    description: "A clean, professional design for corporate events and announcements",
    category: "business",
    content: `
      <div style="display: flex; align-items: center; justify-content: center; text-align: left; min-height: 100vh; width: 100%; background-image: url('https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/8bc10f98-d68d-4092-b873-6a066f04e2e7-business-professional-bg.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; box-sizing: border-box;">
        <div style="padding: min(50px, 6vw); margin: min(20px, 3vw); width: 100%; max-width: 100%; box-shadow: 0 4px 8px rgba(0,0,0,0.1); box-sizing: border-box;">
          <h1 id="block-h1-0" style="color: #2c3e50; font-family: 'Arial', sans-serif; font-size: clamp(20px, 4vw, 28px); margin-bottom: max(10px, 2vh); border-bottom: 2px solid #3498db; padding-bottom: 10px;">QUARTERLY BUSINESS MEETING</h1>
          <p id="block-p-0" style="font-size: clamp(12px, 2.5vw, 16px); margin-bottom: max(15px, 3vh); color: #7f8c8d;">Atlas Corporation invites you to our Q2 Review</p>
          <h2 id="block-h2-0" style="font-family: 'Arial', sans-serif; font-size: clamp(16px, 3.5vw, 22px); margin-bottom: max(10px, 2vh); color: #2c3e50;">Strategic Direction & Financial Performance</h2>
          <p id="block-p-1" style="font-size: clamp(12px, 2.4vw, 15px); margin-bottom: max(5px, 1vh);">Thursday, June 12th, 2025 at 10:00 AM</p>
          <p id="block-p-2" style="font-size: clamp(12px, 2.4vw, 15px); margin-bottom: max(15px, 3vh);">Atlas Headquarters, Conference Room A</p>
          <p id="block-p-3" style="font-style: normal; color: #7f8c8d; font-size: clamp(12px, 2.4vw, 15px);">Please RSVP by June 5th • Lunch will be provided</p>
        </div>
      </div>
    `
  },
  {
    id: "business-casual",
    name: "Casual Meeting",
    thumbnail: "https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/9921f82a-4400-44b8-9307-260c710ed9f5-business-casual-bg.jpg",
    backgroundImage: "https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/9921f82a-4400-44b8-9307-260c710ed9f5-business-casual-bg.jpg",
    description: "A relaxed and friendly design for informal business meetings",
    category: "business",
    content: `<div style="display: flex; align-items: center; justify-content: center; text-align: left; min-height: 100vh; width: 100%; background-image: url('https://inviteloop.s3.ap-southeast-1.amazonaws.com/cards/9921f82a-4400-44b8-9307-260c710ed9f5-business-casual-bg.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; box-sizing: border-box;">
        <div style="padding: min(50px, 6vw); margin: min(20px, 3vw); width: 100%; max-width: 100%; box-shadow: 0 4px 8px rgba(0,0,0,0.1); box-sizing: border-box;">
          <h1 id="block-h1-0" style="color: #2c3e50; font-family: 'Roboto', sans-serif; font-size: clamp(20px, 4vw, 28px); margin-bottom: max(10px, 2vh); border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">Team Building Session</h1>
          <p id="block-p-0" style="font-size: clamp(12px, 2.5vw, 16px); margin-bottom: max(15px, 3vh); color: #7f8c8d;">Join us for a day of team-building activities</p>
          <h2 id="block-h2-0" style="font-family: 'Roboto', sans-serif; font-size: clamp(16px, 3.5vw, 22px); margin-bottom: max(10px, 2vh); color: #2c3e50;">Collaboration & Communication Workshop</h2>
          <p id="block-p-1" style="font-size: clamp(12px, 2.4vw, 15px); margin-bottom: max(5px, 1vh);">Friday, July 18th, 2025 at 9:00 AM</p>
          <p id="block-p-2" style="font-size: clamp(12px, 2.4vw, 15px); margin-bottom: max(15px, 3vh);">Green Park, Banani</p>
          <p id="block-p-3" style="font-style: normal; normal; color: #7f8c8d; font-size: clamp(12px, 2.4vw, 15px);">Please RSVP by July 1st • Lunch will be provided</p>
        </div>
      </div>`
  },
  // NEW TEMPLATES GO HERE
  {
    id: "new-wedding-modern",
    name: "Modern Wedding",
    thumbnail: "https://images.pexels.com/photos/3038299/pexels-photo-3038299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backgroundImage: "https://images.pexels.com/photos/3038299/pexels-photo-3038299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Clean, contemporary wedding invitation with minimalist design",
    category: "wedding",
    content: `<div style="display: flex; align-items: center; justify-content: center; text-align: center; min-height: 100vh; width: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); box-sizing: border-box;">
    <div style="background: rgba(255, 255, 255, 0.95); padding: min(50px, 6vw); margin: min(30px, 4vw); border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); width: 100%; max-width: 500px; box-sizing: border-box;">
      <div style="width: 80px; height: 2px; background: #667eea; margin: 0 auto max(20px, 3vh) auto;"></div>
      <h1 id="block-h1-0" style="color: #2c3e50; font-family: 'Helvetica', sans-serif; font-size: clamp(28px, 5.5vw, 36px); font-weight: 300; margin-bottom: max(15px, 2vh);">WEDDING INVITATION</h1>
      <h2 id="block-h2-0" style="font-family: 'Helvetica', sans-serif; font-size: clamp(22px, 4.5vw, 28px); font-weight: 700; margin-bottom: max(20px, 3vh); color: #667eea;">SARAH & MICHAEL</h2>
      <p id="block-p-0" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(10px, 2vh); color: #7f8c8d;">REQUEST THE PLEASURE OF YOUR COMPANY</p>
      <p id="block-p-1" style="font-size: clamp(13px, 2.8vw, 17px); margin-bottom: max(5px, 1vh); color: #2c3e50;">JUNE 15TH, 2025 • 4:00 PM</p>
      <p id="block-p-2" style="font-size: clamp(13px, 2.8vw, 17px); margin-bottom: max(20px, 3vh); color: #2c3e50;">SKYLINE VENUE, DHANMONDI</p>
      <div style="width: 80px; height: 2px; background: #667eea; margin: max(20px, 3vh) auto 0 auto;"></div>
    </div>
  </div>`
  },

  // Birthday Templates
  {
    id: "birthday-celebration",
    name: "Birthday Celebration",
    thumbnail: "https://images.pexels.com/photos/3905855/pexels-photo-3905855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backgroundImage: "https://images.pexels.com/photos/3905855/pexels-photo-3905855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Vibrant and fun birthday invitation perfect for all ages",
    category: "birthday",
    content: `<div style="display: flex; align-items: center; justify-content: center; text-align: center; min-height: 100vh; width: 100%; background-image: url('/public/business/business-casual-bg.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat; box-sizing: border-box;">
    <div style="background: rgba(255, 255, 255, 0.9); padding: min(40px, 5vw); margin: min(20px, 3vw); border-radius: 25px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); width: 100%; max-width: 450px; box-sizing: border-box;">
      <h1 id="block-h1-0" style="color: #ff6b6b; font-family: 'Comic Sans MS', cursive; font-size: clamp(32px, 6vw, 42px); margin-bottom: max(15px, 2vh); text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">🎉 YOU'RE INVITED! 🎉</h1>
      <p id="block-p-0" style="font-size: clamp(16px, 3.5vw, 20px); margin-bottom: max(20px, 3vh); color: #2c3e50; font-weight: 600;">Join us for an amazing birthday party!</p>
      <h2 id="block-h2-0" style="font-family: 'Comic Sans MS', cursive; font-size: clamp(24px, 5vw, 32px); margin-bottom: max(15px, 2vh); color: #feca57;">ALEX'S 25TH BIRTHDAY</h2>
      <p id="block-p-1" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(8px, 1.5vh); color: #2c3e50;">🗓️ Saturday, March 8th, 2025</p>
      <p id="block-p-2" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(8px, 1.5vh); color: #2c3e50;">⏰ 7:00 PM onwards</p>
      <p id="block-p-3" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(20px, 3vh); color: #2c3e50;">📍 Party Hall, Uttara Dhaka</p>
      <p id="block-p-4" style="font-style: italic; color: #e74c3c; font-size: clamp(13px, 2.8vw, 17px); font-weight: 600;">Cake, Music, and Great Memories Await! 🎂🎵</p>
    </div>
  </div>
  <style>
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  </style>`
  },
  {
    id: "modern-birthday-elegant",
    name: "Modern Elegant Birthday",
    thumbnail: "https://images.pexels.com/photos/4389637/pexels-photo-4389637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backgroundImage: "https://images.pexels.com/photos/4389637/pexels-photo-4389637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Sophisticated birthday invitation for milestone celebrations",
    category: "birthday",
    content: `<div style="display: flex; align-items: center; justify-content: center; text-align: center; min-height: 100vh; width: 100%; background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); box-sizing: border-box;">
    <div style="background: linear-gradient(145deg, #ffffff, #f8f9fa); padding: min(50px, 6vw); margin: min(30px, 4vw); border-radius: 15px; box-shadow: 0 25px 50px rgba(0,0,0,0.15); width: 100%; max-width: 480px; box-sizing: border-box; border: 1px solid rgba(255,255,255,0.2);">
      <div style="width: 100px; height: 1px; background: linear-gradient(90deg, transparent, #1e3c72, transparent); margin: 0 auto max(25px, 3vh) auto;"></div>
      <h1 id="block-h1-0" style="color: #1e3c72; font-family: 'Playfair Display', serif; font-size: clamp(26px, 5vw, 34px); margin-bottom: max(20px, 3vh); font-weight: 400;">You Are Cordially Invited</h1>
      <p id="block-p-0" style="font-size: clamp(15px, 3.2vw, 19px); margin-bottom: max(25px, 4vh); color: #34495e; font-style: italic;">To celebrate a milestone birthday</p>
      <h2 id="block-h2-0" style="font-family: 'Playfair Display', serif; font-size: clamp(28px, 5.5vw, 36px); margin-bottom: max(20px, 3vh); color: #2a5298; font-weight: 700;">DIANA'S 50TH</h2>
      <p id="block-p-1" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(8px, 1.5vh); color: #2c3e50;">Friday, April 25th, 2025</p>
      <p id="block-p-2" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(8px, 1.5vh); color: #2c3e50;">6:30 PM - 11:00 PM</p>
      <p id="block-p-3" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(25px, 4vh); color: #2c3e50;">The Peninsula Restaurant, Gulshan</p>
      <div style="width: 100px; height: 1px; background: linear-gradient(90deg, transparent, #1e3c72, transparent); margin: max(25px, 4vh) auto 0 auto;"></div>
      <p id="block-p-4" style="font-style: italic; color: #7f8c8d; font-size: clamp(12px, 2.5vw, 16px); margin-top: max(20px, 3vh);">Dress Code: Cocktail Attire</p>
    </div>
  </div>`
  },

  // Corporate Templates
  {
    id: "corporate-conference",
    name: "Corporate Conference",
    thumbnail: "https://images.pexels.com/photos/7821911/pexels-photo-7821911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backgroundImage: "https://images.pexels.com/photos/7821911/pexels-photo-7821911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Professional conference invitation with modern corporate design",
    category: "corporate",
    content: `<div style="display: flex; align-items: center; justify-content: center; text-align: center; min-height: 100vh; width: 100%; background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); box-sizing: border-box;">
    <div style="background: #ffffff; padding: min(45px, 5.5vw); margin: min(25px, 3.5vw); border-radius: 8px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); width: 100%; max-width: 500px; box-sizing: border-box; border-left: 5px solid #3498db;">
      <div style="text-align: left; margin-bottom: max(30px, 4vh);">
        <div style="width: 60px; height: 4px; background: #3498db; margin-bottom: max(15px, 2vh);"></div>
        <h1 id="block-h1-0" style="color: #2c3e50; font-family: 'Arial', sans-serif; font-size: clamp(24px, 4.8vw, 30px); margin-bottom: max(10px, 2vh); font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">TECH SUMMIT 2025</h1>
        <p id="block-p-0" style="font-size: clamp(16px, 3.5vw, 20px); color: #3498db; font-weight: 600; margin-bottom: max(20px, 3vh);">Innovation • Leadership • Future</p>
      </div>
      <div style="text-align: left;">
        <h2 id="block-h2-0" style="font-family: 'Arial', sans-serif; font-size: clamp(18px, 3.8vw, 24px); margin-bottom: max(15px, 2vh); color: #2c3e50; font-weight: 600;">You're Invited to Join Industry Leaders</h2>
        <div style="margin-bottom: max(25px, 4vh);">
          <p id="block-p-1" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(8px, 1.5vh); color: #34495e;"><strong>Date:</strong> Monday, July 14th, 2025</p>
          <p id="block-p-2" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(8px, 1.5vh); color: #34495e;"><strong>Time:</strong> 9:00 AM - 6:00 PM</p>
          <p id="block-p-3" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(8px, 1.5vh); color: #34495e;"><strong>Venue:</strong> Dhaka Convention Center</p>
        </div>
        <p id="block-p-4" style="font-size: clamp(13px, 2.8vw, 17px); color: #7f8c8d; line-height: 1.6;">Join 500+ professionals for keynote speeches, networking sessions, and breakthrough technology demonstrations.</p>
      </div>
    </div>
  </div>`
  },
  {
    id: "corporate-annual-dinner",
    name: "Annual Dinner",
    thumbnail: "https://images.pexels.com/photos/8015562/pexels-photo-8015562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backgroundImage: "https://images.pexels.com/photos/8015562/pexels-photo-8015562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Formal corporate annual dinner invitation",
    category: "corporate",
    content: `<div style="display: flex; align-items: center; justify-content: center; text-align: center; min-height: 100vh; width: 100%; background: linear-gradient(135deg, #8b5a3c 0%, #a0522d 100%); box-sizing: border-box;">
    <div style="background: linear-gradient(145deg, #f8f9fa, #ffffff); padding: min(50px, 6vw); margin: min(30px, 4vw); border-radius: 12px; box-shadow: 0 25px 50px rgba(0,0,0,0.2); width: 100%; max-width: 520px; box-sizing: border-box;">
      <div style="border: 2px solid #8b5a3c; padding: min(40px, 5vw); border-radius: 8px;">
        <h1 id="block-h1-0" style="color: #8b5a3c; font-family: 'Times New Roman', serif; font-size: clamp(24px, 4.8vw, 30px); margin-bottom: max(20px, 3vh); font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">ANNUAL DINNER</h1>
        <div style="width: 80px; height: 2px; background: #8b5a3c; margin: 0 auto max(25px, 4vh) auto;"></div>
        <h2 id="block-h2-0" style="font-family: 'Times New Roman', serif; font-size: clamp(20px, 4vw, 26px); margin-bottom: max(25px, 4vh); color: #2c3e50; font-style: italic;">Excellence in Achievement</h2>
        <p id="block-p-0" style="font-size: clamp(15px, 3.2vw, 19px); margin-bottom: max(20px, 3vh); color: #34495e; line-height: 1.6;">ABC Corporation cordially invites you to our annual celebration recognizing outstanding performance and dedication.</p>
        <div style="margin: max(30px, 4vh) 0;">
          <p id="block-p-1" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(8px, 1.5vh); color: #2c3e50;"><strong>Saturday, December 20th, 2025</strong></p>
          <p id="block-p-2" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(8px, 1.5vh); color: #2c3e50;"><strong>7:00 PM - 11:00 PM</strong></p>
          <p id="block-p-3" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(20px, 3vh); color: #2c3e50;"><strong>Grand Ballroom, Hotel InterContinental</strong></p>
        </div>
        <div style="width: 80px; height: 2px; background: #8b5a3c; margin: max(25px, 4vh) auto 0 auto;"></div>
        <p id="block-p-4" style="font-size: clamp(12px, 2.5vw, 16px); color: #7f8c8d; font-style: italic; margin-top: max(20px, 3vh);">Black Tie Event | RSVP Required</p>
      </div>
    </div>
  </div>`
  },

  // Graduation Templates
  {
    id: "graduation-classic",
    name: "Classic Graduation",
    thumbnail: "https://images.pexels.com/photos/7723728/pexels-photo-7723728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backgroundImage: "https://images.pexels.com/photos/7723728/pexels-photo-7723728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Traditional graduation ceremony invitation",
    category: "graduation",
    content: `<div style="display: flex; align-items: center; justify-content: center; text-align: center; min-height: 100vh; width: 100%; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); box-sizing: border-box;">
    <div style="background: #ffffff; padding: min(45px, 5.5vw); margin: min(25px, 3.5vw); border-radius: 15px; box-shadow: 0 20px 40px rgba(0,0,0,0.15); width: 100%; max-width: 480px; box-sizing: border-box; border-top: 8px solid #fbbf24;">
      <div style="margin-bottom: max(30px, 4vh);">
        <h1 id="block-h1-0" style="color: #1e40af; font-family: 'Times New Roman', serif; font-size: clamp(22px, 4.5vw, 28px); margin-bottom: max(15px, 2vh); font-weight: bold;">🎓 GRADUATION CEREMONY 🎓</h1>
        <div style="width: 120px; height: 3px; background: linear-gradient(90deg, #1e40af, #fbbf24, #1e40af); margin: 0 auto max(20px, 3vh) auto;"></div>
      </div>
      <p id="block-p-0" style="font-size: clamp(16px, 3.5vw, 20px); margin-bottom: max(25px, 4vh); color: #374151; font-weight: 600;">You are cordially invited to celebrate</p>
      <h2 id="block-h2-0" style="font-family: 'Times New Roman', serif; font-size: clamp(24px, 5vw, 32px); margin-bottom: max(20px, 3vh); color: #1e40af; font-weight: bold;">JESSICA THOMPSON</h2>
      <p id="block-p-1" style="font-size: clamp(15px, 3.2vw, 19px); margin-bottom: max(20px, 3vh); color: #6b7280; font-style: italic;">Bachelor of Science in Computer Engineering</p>
      <div style="background: #f3f4f6; padding: min(20px, 3vw); border-radius: 8px; margin: max(25px, 4vh) 0;">
        <p id="block-p-2" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(8px, 1.5vh); color: #374151;"><strong>Date:</strong> Saturday, May 17th, 2025</p>
        <p id="block-p-3" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(8px, 1.5vh); color: #374151;"><strong>Time:</strong> 10:00 AM</p>
        <p id="block-p-4" style="font-size: clamp(14px, 3vw, 18px); color: #374151;"><strong>Venue:</strong> University Auditorium, BUET</p>
      </div>
      <p id="block-p-5" style="font-size: clamp(13px, 2.8vw, 17px); color: #9ca3af; margin-top: max(20px, 3vh); font-style: italic;">Reception to follow immediately after ceremony</p>
    </div>
  </div>`
  },

  // Baby Shower Template
  {
    id: "baby-shower-gentle",
    name: "Gentle Baby Shower",
    thumbnail: "https://images.pexels.com/photos/12114825/pexels-photo-12114825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backgroundImage: "https://images.pexels.com/photos/12114825/pexels-photo-12114825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Soft and sweet baby shower invitation",
    category: "baby-shower",
    content: `<div style="display: flex; align-items: center; justify-content: center; text-align: center; min-height: 100vh; width: 100%; background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 50%, #f3e8ff 100%); box-sizing: border-box;">
    <div style="background: rgba(255, 255, 255, 0.9); padding: min(45px, 5.5vw); margin: min(25px, 3.5vw); border-radius: 25px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); width: 100%; max-width: 450px; box-sizing: border-box; border: 2px solid #f8bbd9;">
      <h1 id="block-h1-0" style="color: #be185d; font-family: 'Comic Sans MS', cursive; font-size: clamp(26px, 5.2vw, 34px); margin-bottom: max(20px, 3vh); text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">👶 BABY SHOWER 👶</h1>
      <p id="block-p-0" style="font-size: clamp(16px, 3.5vw, 20px); margin-bottom: max(25px, 4vh); color: #7c3aed; font-weight: 600;">Join us in celebrating</p>
      <h2 id="block-h2-0" style="font-family: 'Comic Sans MS', cursive; font-size: clamp(22px, 4.5vw, 28px); margin-bottom: max(15px, 2vh); color: #be185d;">SARAH & BABY</h2>
      <p id="block-p-1" style="font-size: clamp(15px, 3.2vw, 19px); margin-bottom: max(25px, 4vh); color: #8b5cf6; font-style: italic;">A little bundle of joy is on the way!</p>
      <div style="background: linear-gradient(135deg, #fef7ff, #fce7f3); padding: min(25px, 4vw); border-radius: 15px; margin: max(25px, 4vh) 0;">
        <p id="block-p-2" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(8px, 1.5vh); color: #374151;">🗓️ Sunday, June 8th, 2025</p>
        <p id="block-p-3" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(8px, 1.5vh); color: #374151;">⏰ 2:00 PM - 5:00 PM</p>
        <p id="block-p-4" style="font-size: clamp(14px, 3vw, 18px); color: #374151;">🏠 Community Center, Dhanmondi</p>
      </div>
      <p id="block-p-5" style="font-size: clamp(12px, 2.5vw, 16px); color: #be185d; margin-top: max(20px, 3vh); font-style: italic;">Games, Food & Sweet Memories! 🎁🍰</p>
    </div>
  </div>`
  },

  // Housewarming Template
  {
    id: "housewarming-cozy",
    name: "Cozy Housewarming",
    thumbnail: "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backgroundImage: "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Warm and welcoming housewarming party invitation",
    category: "housewarming",
    content: `<div style="display: flex; align-items: center; justify-content: center; text-align: center; min-height: 100vh; width: 100%; background: linear-gradient(135deg, #059669 0%, #10b981 100%); box-sizing: border-box;">
    <div style="background: #ffffff; padding: min(45px, 5.5vw); margin: min(25px, 3.5vw); border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.15); width: 100%; max-width: 480px; box-sizing: border-box; border: 3px solid #34d399;">
      <h1 id="block-h1-0" style="color: #059669; font-family: 'Georgia', serif; font-size: clamp(26px, 5.2vw, 34px); margin-bottom: max(20px, 3vh); font-weight: bold;">🏠 NEW HOME CELEBRATION 🏠</h1>
      <div style="width: 100px; height: 3px; background: linear-gradient(90deg, #059669, #34d399, #059669); margin: 0 auto max(25px, 4vh) auto; border-radius: 2px;"></div>
      <p id="block-p-0" style="font-size: clamp(16px, 3.5vw, 20px); margin-bottom: max(25px, 4vh); color: #065f46; font-weight: 600;">You're warmly invited to our</p>
      <h2 id="block-h2-0" style="font-family: 'Georgia', serif; font-size: clamp(24px, 4.8vw, 32px); margin-bottom: max(20px, 3vh); color: #059669; font-weight: bold;">HOUSEWARMING PARTY</h2>
      <p id="block-p-1" style="font-size: clamp(15px, 3.2vw, 19px); margin-bottom: max(25px, 4vh); color: #374151; font-style: italic;">Help us make our new house a home!</p>
      <div style="background: #f0fdf4; padding: min(25px, 4vw); border-radius: 12px; border-left: 4px solid #22c55e;">
        <p id="block-p-2" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(8px, 1.5vh); color: #374151;"><strong>📅 Date:</strong> Saturday, August 23rd, 2025</p>
        <p id="block-p-3" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(8px, 1.5vh); color: #374151;"><strong>🕕 Time:</strong> 6:00 PM onwards</p>
        <p id="block-p-4" style="font-size: clamp(14px, 3vw, 18px); color: #374151;"><strong>🏡 Address:</strong> House #25, Road #8, Banani</p>
      </div>
      <p id="block-p-5" style="font-size: clamp(13px, 2.8vw, 17px); color: #059669; margin-top: max(20px, 3vh); font-style: italic;">Food, Drinks & House Tours! 🍕🥂</p>
    </div>
  </div>`
  },

  // Anniversary Template
  {
    id: "anniversary-golden",
    name: "Golden Anniversary",
    thumbnail: "https://images.pexels.com/photos/2072175/pexels-photo-2072175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backgroundImage: "https://images.pexels.com/photos/2072175/pexels-photo-2072175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Elegant golden anniversary celebration invitation",
    category: "anniversary",
    content: `<div style="display: flex; align-items: center; justify-content: center; text-align: center; min-height: 100vh; width: 100%; background: linear-gradient(135deg, #92400e 0%, #d97706 50%, #fbbf24 100%); box-sizing: border-box;">
    <div style="background: linear-gradient(145deg, #fffbeb, #fef3c7); padding: min(50px, 6vw); margin: min(30px, 4vw); border-radius: 18px; box-shadow: 0 25px 50px rgba(0,0,0,0.2); width: 100%; max-width: 500px; box-sizing: border-box; border: 2px solid #fbbf24;">
      <div style="text-align: center; margin-bottom: max(30px, 4vh);">
        <h1 id="block-h1-0" style="color: #92400e; font-family: 'Playfair Display', serif; font-size: clamp(24px, 4.8vw, 32px); margin-bottom: max(15px, 2vh); font-weight: bold;">💍 GOLDEN ANNIVERSARY 💍</h1>
        <div style="width: 150px; height: 3px; background: linear-gradient(90deg, #92400e, #fbbf24, #92400e); margin: 0 auto max(20px, 3vh) auto; border-radius: 2px;"></div>
      </div>
      <p id="block-p-0" style="font-size: clamp(18px, 3.8vw, 22px); margin-bottom: max(25px, 4vh); color: #92400e; font-weight: 600;">Celebrating 50 Years of Love</p>
      <h2 id="block-h2-0" style="font-family: 'Playfair Display', serif; font-size: clamp(26px, 5.2vw, 34px); margin-bottom: max(20px, 3vh); color: #d97706; font-weight: bold;">ROBERT & MARIA</h2>
      <p id="block-p-1" style="font-size: clamp(15px, 3.2vw, 19px); margin-bottom: max(30px, 4vh); color: #451a03; font-style: italic; line-height: 1.6;">Join us as we celebrate half a century of marriage, love, and beautiful memories together.</p>
      <div style="background: rgba(251, 191, 36, 0.1); padding: min(25px, 4vw); border-radius: 12px; border: 1px solid #fbbf24;">
        <p id="block-p-2" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(8px, 1.5vh); color: #374151;"><strong>📅 Sunday, September 14th, 2025</strong></p>
        <p id="block-p-3" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(8px, 1.5vh); color: #374151;"><strong>🕐 1:00 PM - 6:00 PM</strong></p>
        <p id="block-p-4" style="font-size: clamp(14px, 3vw, 18px); color: #374151;"><strong>🏛️ Grand Ballroom, Sonargaon Hotel</strong></p>
      </div>
      <p id="block-p-5" style="font-size: clamp(12px, 2.5vw, 16px); color: #92400e; margin-top: max(20px, 3vh); font-style: italic;">Lunch, Music & Memories to Share! 🎵💐</p>
    </div>
  </div>`
  },

  // Holiday Party Template
  {
    id: "holiday-festive",
    name: "Festive Holiday Party",
    thumbnail: "https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backgroundImage: "https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Cheerful holiday party invitation with festive design",
    category: "holiday",
    content: `<div style="display: flex; align-items: center; justify-content: center; text-align: center; min-height: 100vh; width: 100%; background: linear-gradient(135deg, #dc2626 0%, #16a34a 50%, #dc2626 100%); background-size: 400% 400%; animation: festiveGradient 8s ease infinite; box-sizing: border-box;">
    <div style="background: rgba(255, 255, 255, 0.95); padding: min(45px, 5.5vw); margin: min(25px, 3.5vw); border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); width: 100%; max-width: 480px; box-sizing: border-box; border: 3px solid #dc2626;">
      <h1 id="block-h1-0" style="color: #dc2626; font-family: 'Comic Sans MS', cursive; font-size: clamp(28px, 5.5vw, 36px); margin-bottom: max(20px, 3vh); text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">🎄 HOLIDAY PARTY 🎄</h1>
      <div style="display: flex; justify-content: center; margin-bottom: max(25px, 4vh);">
        <div style="width: 30px; height: 30px; background: #dc2626; border-radius: 50%; margin: 0 5px; animation: bounce 2s infinite;"></div>
        <div style="width: 30px; height: 30px; background: #16a34a; border-radius: 50%; margin: 0 5px; animation: bounce 2s infinite 0.5s;"></div>
        <div style="width: 30px; height: 30px; background: #dc2626; border-radius: 50%; margin: 0 5px; animation: bounce 2s infinite 1s;"></div>
      </div>
      <p id="block-p-0" style="font-size: clamp(16px, 3.5vw, 20px); margin-bottom: max(25px, 4vh); color: #16a34a; font-weight: 600;">You're invited to celebrate the season!</p>
      <h2 id="block-h2-0" style="font-family: 'Comic Sans MS', cursive; font-size: clamp(22px, 4.5vw, 28px); margin-bottom: max(20px, 3vh); color: #dc2626;">ANNUAL CHRISTMAS CELEBRATION</h2>
      <p id="block-p-1" style="font-size: clamp(15px, 3.2vw, 19px); margin-bottom: max(25px, 4vh); color: #374151; font-style: italic;">Join us for food, fun, and holiday cheer!</p>
      <div style="background: linear-gradient(135deg, #fef2f2, #f0fdf4); padding: min(25px, 4vw); border-radius: 15px; border: 1px solid #16a34a;">
        <p id="block-p-2" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(8px, 1.5vh); color: #374151;">🗓️ <strong>Friday, December 19th, 2025</strong></p>
        <p id="block-p-3" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(8px, 1.5vh); color: #374151;">🕰️ <strong>7:00 PM - 12:00 AM</strong></p>
        <p id="block-p-4" style="font-size: clamp(14px, 3vw, 18px); color: #374151;">🏢 <strong>Office Conference Hall, Gulshan</strong></p>
      </div>
      <p id="block-p-5" style="font-size: clamp(13px, 2.8vw, 17px); color: #dc2626; margin-top: max(20px, 3vh); font-weight: 600;">Secret Santa, Karaoke & Delicious Food! 🎁🎤🍽️</p>
    </div>
  </div>
  <style>
    @keyframes festiveGradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      60% { transform: translateY(-5px); }
    }
  </style>`
  },

  // Reunion Template
  {
    id: "reunion-memories",
    name: "Memories Reunion",
    thumbnail: "https://images.pexels.com/photos/5638701/pexels-photo-5638701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backgroundImage: "https://images.pexels.com/photos/5638701/pexels-photo-5638701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Nostalgic reunion invitation for friends and family",
    category: "reunion",
    content: `<div style="display: flex; align-items: center; justify-content: center; text-align: center; min-height: 100vh; width: 100%; background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%); box-sizing: border-box;">
    <div style="background: rgba(255, 255, 255, 0.9); padding: min(50px, 6vw); margin: min(30px, 4vw); border-radius: 15px; box-shadow: 0 25px 50px rgba(0,0,0,0.2); width: 100%; max-width: 520px; box-sizing: border-box;">
      <div style="background: linear-gradient(135deg, #f3e8ff, #e9d5ff); padding: min(30px, 4vw); border-radius: 12px; margin-bottom: max(30px, 4vh);">
        <h1 id="block-h1-0" style="color: #7c3aed; font-family: 'Times New Roman', serif; font-size: clamp(26px, 5.2vw, 34px); margin-bottom: max(15px, 2vh); font-weight: bold;">🎊 CLASS REUNION 🎊</h1>
        <p id="block-p-0" style="font-size: clamp(18px, 3.8vw, 22px); color: #581c87; font-weight: 600;">Reliving the Golden Days</p>
      </div>
      <h2 id="block-h2-0" style="font-family: 'Times New Roman', serif; font-size: clamp(22px, 4.5vw, 28px); margin-bottom: max(20px, 3vh); color: #7c3aed; font-weight: bold;">DHAKA COLLEGE - CLASS OF 2010</h2>
      <p id="block-p-1" style="font-size: clamp(16px, 3.5vw, 20px); margin-bottom: max(25px, 4vh); color: #4c1d95; line-height: 1.6;">It's been 15 years! Let's come together to share memories, catch up on life, and create new moments to cherish.</p>
      <div style="background: #f8fafc; padding: min(25px, 4vw); border-radius: 10px; border: 2px solid #a855f7; margin: max(25px, 4vh) 0;">
        <p id="block-p-2" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(8px, 1.5vh); color: #374151;"><strong>📅 Date:</strong> Saturday, October 11th, 2025</p>
        <p id="block-p-3" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(8px, 1.5vh); color: #374151;"><strong>⏰ Time:</strong> 6:00 PM - 11:00 PM</p>
        <p id="block-p-4" style="font-size: clamp(14px, 3vw, 18px); margin-bottom: max(8px, 1.5vh); color: #374151;"><strong>📍 Venue:</strong> The Westin Dhaka</p>
        <p id="block-p-5" style="font-size: clamp(14px, 3vw, 18px); color: #374151;"><strong>💰 Cost:</strong> 2,500 BDT per person</p>
      </div>
      <p id="block-p-6" style="font-size: clamp(13px, 2.8vw, 17px); color: #7c3aed; margin-top: max(20px, 3vh); font-style: italic;">Dinner, Music & Memories Galore! Bring your old photos! 📸✨</p>
    </div>
  </div>`
  }
];