/**
 * Baths R Us - Automated Promotion Scheduler
 * Netlify Function that serves the correct promotion based on current date
 * Save as: /netlify/functions/promotion-scheduler.js
 * 
 * NO MANUAL UPDATES NEEDED - Promotions change automatically by date!
 */

// 2025 PROMOTION CALENDAR
const promotions = [
    // ============ JANUARY ============
    {
        start: '01-01',
        end: '01-15',
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
    {
        start: '01-16',
        end: '01-20',
        data: {
            holidayName: 'MLK Weekend Sale',
            mainOffer: 'Dream Bathroom Sale - 20% Off',
            bonusOffer: 'Free Consultation',
            urgency: 'This Weekend',
            desktopPrefix: '⭐',
            desktopSuffix: '⭐',
            mobileTitle: 'Weekend Sale:',
            mobileOffer: '20% Off!',
            mobileIcon: '⭐'
        }
    },
    
    // ============ FEBRUARY ============
    {
        start: '02-01',
        end: '02-14',
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
    {
        start: '02-15',
        end: '02-22',
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
    
    // ============ MARCH ============
    {
        start: '03-01',
        end: '03-31',
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
    
    // ============ APRIL ============
    {
        start: '04-01',
        end: '04-15',
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
    {
        start: '04-16',
        end: '04-30',
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
    
    // ============ MAY ============
    {
        start: '05-01',
        end: '05-12',
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
    {
        start: '05-20',
        end: '05-31',
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
    
    // ============ JUNE ============
    {
        start: '06-01',
        end: '06-20',
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
    {
        start: '06-21',
        end: '07-03',
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
    
    // ============ JULY ============
    {
        start: '07-04',
        end: '07-10',
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
    {
        start: '07-11',
        end: '07-31',
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
    
    // ============ AUGUST ============
    {
        start: '08-01',
        end: '08-31',
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
    
    // ============ SEPTEMBER ============
    {
        start: '09-01',
        end: '09-07',
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
    {
        start: '09-08',
        end: '09-30',
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
    
    // ============ OCTOBER ============
    {
        start: '10-01',
        end: '10-31',
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
    
    // ============ NOVEMBER ============
    {
        start: '11-01',
        end: '11-11',
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
    {
        start: '11-20',
        end: '11-30',
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
    
    // ============ DECEMBER ============
    {
        start: '12-01',
        end: '12-24',
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
    {
        start: '12-25',
        end: '12-31',
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

// Default promotion (when no date matches)
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

// Function to check if current date is within promotion range
function isDateInRange(start, end, currentDate) {
    const year = currentDate.getFullYear();
    const [startMonth, startDay] = start.split('-').map(Number);
    const [endMonth, endDay] = end.split('-').map(Number);
    
    const startDate = new Date(year, startMonth - 1, startDay);
    const endDate = new Date(year, endMonth - 1, endDay);
    
    return currentDate >= startDate && currentDate <= endDate;
}

// Netlify Function handler
export default async (req, context) => {
    // Get current date in Eastern Time
    const now = new Date();
    const easternTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
    
    // Find active promotion
    let activePromotion = defaultPromotion;
    
    for (const promo of promotions) {
        if (isDateInRange(promo.start, promo.end, easternTime)) {
            activePromotion = { ...promo.data };
            
            // Calculate days remaining
            const [endMonth, endDay] = promo.end.split('-').map(Number);
            const endDate = new Date(easternTime.getFullYear(), endMonth - 1, endDay);
            const daysRemaining = Math.ceil((endDate - easternTime) / (1000 * 60 * 60 * 24));
            activePromotion.daysRemaining = daysRemaining;
            
            break; // Use first matching promotion
        }
    }
    
    // Add metadata
    activePromotion.timestamp = new Date().toISOString();
    activePromotion.active = true;
    activePromotion.currentDate = easternTime.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // EMERGENCY OVERRIDE - Uncomment to force a specific promotion
    // activePromotion = {
    //     holidayName: 'FLASH SALE',
    //     mainOffer: 'Today Only - 50% Off Everything',
    //     bonusOffer: 'Limited Quantities',
    //     urgency: 'Ends at Midnight',
    //     desktopPrefix: '🔥',
    //     desktopSuffix: '🔥',
    //     mobileTitle: 'FLASH:',
    //     mobileOffer: '50% OFF!',
    //     mobileIcon: '🔥'
    // };
    
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
            'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
        }
    });
};

// Optional: Export config for custom path
export const config = {
    path: "/api/promotions"
};