// Baths R Us - Automated Promotion Scheduler
// This function automatically serves the correct promotion based on current date

export default async (req, context) => {
    // Get current date in Eastern Time
    const now = new Date();
    const easternTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
    const month = easternTime.getMonth() + 1; // 1-12
    const day = easternTime.getDate();
    
    // 2025 Promotion Calendar
    const promotions = [
        // January
        { start: [1, 1], end: [1, 15], 
          data: {
            holidayName: 'New Year New Bath',
            mainOffer: '2025 Special - $2,025 Off',
            bonusOffer: 'Free Smart Fixtures',
            urgency: 'January Only',
            desktopPrefix: '🎊',
            desktopSuffix: '✨',
            mobileTitle: 'New Year:',
            mobileOffer: '$2,025 Off!',
            mobileIcon: '🎊'
          }
        },
        { start: [1, 16], end: [1, 31], 
          data: {
            holidayName: 'MLK Weekend Sale',
            mainOffer: 'Dream Bathroom Sale - 20% Off',
            bonusOffer: 'Free Consultation',
            urgency: 'This Month',
            desktopPrefix: '⭐',
            desktopSuffix: '⭐',
            mobileTitle: 'Weekend Sale:',
            mobileOffer: '20% Off!',
            mobileIcon: '⭐'
          }
        },
        // February
        { start: [2, 1], end: [2, 14], 
          data: {
            holidayName: "Valentine's Special",
            mainOffer: 'Couples Save 14% Extra',
            bonusOffer: 'His & Hers Vanity Upgrade',
            urgency: 'Book by Feb 14',
            desktopPrefix: '💕',
            desktopSuffix: '💕',
            mobileTitle: "Valentine's:",
            mobileOffer: 'Couples Save 14%!',
            mobileIcon: '❤️'
          }
        },
        { start: [2, 15], end: [2, 28], 
          data: {
            holidayName: 'Presidents Day Sale',
            mainOffer: 'Presidential Savings - $1,776 Off',
            bonusOffer: 'Free American-Made Fixtures',
            urgency: 'This Week',
            desktopPrefix: '🇺🇸',
            desktopSuffix: '🇺🇸',
            mobileTitle: 'Presidents Day:',
            mobileOffer: '$1,776 Off!',
            mobileIcon: '🇺🇸'
          }
        },
        // March
        { start: [3, 1], end: [3, 31], 
          data: {
            holidayName: 'Spring Refresh Event',
            mainOffer: 'Fresh Start Financing - 0% APR for 18 Months',
            bonusOffer: 'Free Spring Cleaning Kit',
            urgency: 'March Special',
            desktopPrefix: '🌸',
            desktopSuffix: '🌷',
            mobileTitle: 'Spring Sale:',
            mobileOffer: '0% APR 18 Months!',
            mobileIcon: '🌸'
          }
        },
        // April
        { start: [4, 1], end: [4, 15], 
          data: {
            holidayName: 'Tax Refund Special',
            mainOffer: 'Put Your Refund to Work - Extra 10% Off',
            bonusOffer: 'Free Upgrade Package',
            urgency: 'April 15 Deadline',
            desktopPrefix: '💰',
            desktopSuffix: '💰',
            mobileTitle: 'Tax Special:',
            mobileOffer: 'Extra 10% Off!',
            mobileIcon: '💰'
          }
        },
        { start: [4, 16], end: [4, 30], 
          data: {
            holidayName: 'Earth Day Eco Sale',
            mainOffer: 'Go Green - Save Green! Eco-Friendly Upgrades',
            bonusOffer: 'Free Water-Saving Fixtures',
            urgency: 'Limited Time',
            desktopPrefix: '🌍',
            desktopSuffix: '♻️',
            mobileTitle: 'Eco Sale:',
            mobileOffer: 'Save Water & Money!',
            mobileIcon: '🌍'
          }
        },
        // May
        { start: [5, 1], end: [5, 12], 
          data: {
            holidayName: "Mother's Day Special",
            mainOffer: 'Mom Deserves Luxury - Special Pricing',
            bonusOffer: 'Free Spa Package Upgrade',
            urgency: "Mother's Day",
            desktopPrefix: '🌺',
            desktopSuffix: '💐',
            mobileTitle: "Mom's Special:",
            mobileOffer: 'Spa Upgrade Free!',
            mobileIcon: '💐'
          }
        },
        { start: [5, 13], end: [5, 31], 
          data: {
            holidayName: 'Memorial Day Special',
            mainOffer: 'No Payments & No Interest for 12 Months',
            bonusOffer: 'Premium Upgrades',
            urgency: 'Memorial Weekend',
            desktopPrefix: '✨',
            desktopSuffix: '✨',
            mobileTitle: 'Memorial Day:',
            mobileOffer: '12 Months No Interest!',
            mobileIcon: '🇺🇸'
          }
        },
        // June
        { start: [6, 1], end: [6, 20], 
          data: {
            holidayName: "Father's Day Special",
            mainOffer: "Dad's Dream Bathroom - 20% Off",
            bonusOffer: 'Free Smart Tech Package',
            urgency: "Father's Day",
            desktopPrefix: '👔',
            desktopSuffix: '🎁',
            mobileTitle: "Dad's Special:",
            mobileOffer: '20% Off!',
            mobileIcon: '👔'
          }
        },
        { start: [6, 21], end: [6, 30], 
          data: {
            holidayName: 'Summer Splash Sale',
            mainOffer: 'Cool Off with Hot Deals - 25% Off Showers',
            bonusOffer: 'Free Rainfall Showerhead',
            urgency: 'Summer Special',
            desktopPrefix: '☀️',
            desktopSuffix: '🏖️',
            mobileTitle: 'Summer Sale:',
            mobileOffer: '25% Off Showers!',
            mobileIcon: '☀️'
          }
        },
        // July
        { start: [7, 1], end: [7, 10], 
          data: {
            holidayName: 'Independence Day Sale',
            mainOffer: 'Save $1,776 on Complete Remodels',
            bonusOffer: 'Free Patriotic Tile Accents',
            urgency: 'July 4th Week',
            desktopPrefix: '🇺🇸',
            desktopSuffix: '🎆',
            mobileTitle: 'July 4th:',
            mobileOffer: 'Save $1,776!',
            mobileIcon: '🎆'
          }
        },
        { start: [7, 11], end: [7, 31], 
          data: {
            holidayName: 'Christmas in July',
            mainOffer: 'Holiday Pricing in Summer - 30% Off',
            bonusOffer: 'Gift Card with Purchase',
            urgency: 'July Only',
            desktopPrefix: '🎄',
            desktopSuffix: '☀️',
            mobileTitle: 'Xmas in July:',
            mobileOffer: '30% Off!',
            mobileIcon: '🎄'
          }
        },
        // August
        { start: [8, 1], end: [8, 31], 
          data: {
            holidayName: 'Back to School Special',
            mainOffer: 'Get Organized - Free Storage Solutions',
            bonusOffer: 'Kids Bathroom Safety Package',
            urgency: 'August Special',
            desktopPrefix: '📚',
            desktopSuffix: '🎒',
            mobileTitle: 'School Special:',
            mobileOffer: 'Free Storage!',
            mobileIcon: '📚'
          }
        },
        // September
        { start: [9, 1], end: [9, 7], 
          data: {
            holidayName: 'Labor Day Weekend',
            mainOffer: '25% Off All Labor Costs',
            bonusOffer: 'Free Design Consultation',
            urgency: 'Labor Day Only',
            desktopPrefix: '🔨',
            desktopSuffix: '🔨',
            mobileTitle: 'Labor Day:',
            mobileOffer: '25% Off Labor!',
            mobileIcon: '🔨'
          }
        },
        { start: [9, 8], end: [9, 30], 
          data: {
            holidayName: 'Fall Into Savings',
            mainOffer: 'Autumn Special - Warm Up Your Bathroom',
            bonusOffer: 'Heated Floor Upgrade 50% Off',
            urgency: 'September Only',
            desktopPrefix: '🍂',
            desktopSuffix: '🍁',
            mobileTitle: 'Fall Special:',
            mobileOffer: 'Heated Floors 50% Off!',
            mobileIcon: '🍂'
          }
        },
        // October
        { start: [10, 1], end: [10, 31], 
          data: {
            holidayName: 'Scary Good Deals',
            mainOffer: "Don't Be Scared of These Prices - 31% Off",
            bonusOffer: 'Treat Yourself Package',
            urgency: 'October Only',
            desktopPrefix: '🎃',
            desktopSuffix: '👻',
            mobileTitle: 'Halloween:',
            mobileOffer: '31% Off!',
            mobileIcon: '🎃'
          }
        },
        // November
        { start: [11, 1], end: [11, 11], 
          data: {
            holidayName: 'Veterans Day Honor',
            mainOffer: 'Military Families Save Extra 15%',
            bonusOffer: 'Thank You for Your Service',
            urgency: 'Veterans Week',
            desktopPrefix: '🎖️',
            desktopSuffix: '🇺🇸',
            mobileTitle: 'Veterans:',
            mobileOffer: 'Extra 15% Off!',
            mobileIcon: '🎖️'
          }
        },
        { start: [11, 12], end: [11, 30], 
          data: {
            holidayName: 'Black Friday Mega Sale',
            mainOffer: 'Biggest Sale of the Year - Up to 40% Off',
            bonusOffer: 'Double Warranty + Free Upgrades',
            urgency: 'While Supplies Last',
            desktopPrefix: '🎯',
            desktopSuffix: '🛍️',
            mobileTitle: 'Black Friday:',
            mobileOffer: '40% Off!',
            mobileIcon: '🛍️'
          }
        },
        // December
        { start: [12, 1], end: [12, 24], 
          data: {
            holidayName: 'Holiday Special',
            mainOffer: 'Gift Your Home a New Bathroom',
            bonusOffer: '$500 Gift Card with Purchase',
            urgency: 'Holiday Season',
            desktopPrefix: '🎄',
            desktopSuffix: '🎁',
            mobileTitle: 'Holiday Gift:',
            mobileOffer: '$500 Gift Card!',
            mobileIcon: '🎁'
          }
        },
        { start: [12, 25], end: [12, 31], 
          data: {
            holidayName: 'Year-End Clearance',
            mainOffer: 'Final Days - Everything Must Go',
            bonusOffer: 'Best Prices of 2025',
            urgency: 'Ends Dec 31',
            desktopPrefix: '🎊',
            desktopSuffix: '🎊',
            mobileTitle: 'Year End:',
            mobileOffer: 'Final Clearance!',
            mobileIcon: '🎊'
          }
        }
    ];
    
    // Default promotion
    const defaultPromotion = {
        holidayName: 'Limited Time Offer',
        mainOffer: 'Special Financing Available - 0% Interest',
        bonusOffer: 'Free Design Consultation',
        urgency: 'Call Today',
        desktopPrefix: '⭐',
        desktopSuffix: '⭐',
        mobileTitle: 'Special:',
        mobileOffer: 'Free Consultation!',
        mobileIcon: '📞'
    };
    
    // Find active promotion
    let activePromotion = defaultPromotion;
    
    for (const promo of promotions) {
        const [startMonth, startDay] = promo.start;
        const [endMonth, endDay] = promo.end;
        
        // Check if current date is within range
        if (month === startMonth && day >= startDay && day <= endDay) {
            activePromotion = promo.data;
            break;
        }
        if (month === endMonth && day <= endDay) {
            activePromotion = promo.data;
            break;
        }
    }
    
    // Add metadata
    activePromotion.timestamp = new Date().toISOString();
    activePromotion.currentDate = easternTime.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Return JSON response with CORS headers for AMP
    return new Response(JSON.stringify(activePromotion, null, 2), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type, AMP-Access-Control-Allow-Source-Origin',
            'AMP-Access-Control-Allow-Source-Origin': '*',
            'Access-Control-Expose-Headers': 'AMP-Access-Control-Allow-Source-Origin',
            'Cache-Control': 'public, max-age=3600'
        }
    });
};

export const config = {
    path: "/api/promotions"
};
