const Requirements = () => (
  <div>
    <p>
      To book your car, all you need is a credit or debit card. When you pick
      the car up, you'll need:
    </p>
    <ul className='ml-2'>
      <li className='list-disc ml-2'>
        Your voucher / eVoucher, to show that you've paid for the car.
      </li>
      <li className='list-disc ml-2'>
        The main driver's credit / debit card, with enough available funds for
        the car's deposit.
      </li>
      <li className='list-disc ml-2'>
        Each driver's full, valid driving licence, which they've held for at
        least 12 months (often 24).
      </li>
      <li className='list-disc ml-2'>
        Your passport and any other ID the car hire company needs to see.
      </li>
    </ul>
  </div>
)
const ThingsToLook = () => (
  <div>
    <ul className='ml-2'>
      <li className='list-disc ml-2'>
        Space: You'll enjoy your rental far more if you choose a car with plenty
        of room for your passengers and luggage.
      </li>
      <li className='list-disc ml-2'>
        Fuel policy: Not planning on driving much? A Like for like fuel policy
        can save you a lot of money.
      </li>
      <li className='list-disc ml-2'>
        Location: You can't beat an 'on-airport' pick-up for convenience, but an
        'off-airport' pick-up with a shuttle bus can be much cheaper.
      </li>
    </ul>
  </div>
)

export const faq = [
  {
    control: 'What do I need to hire a car?',
    panel: <Requirements />,
    value: 'requirements'
  },
  {
    control: 'How old do I have to be to rent a car?',
    panel: (
      <div>
        For most car hire companies, the age requirement is between 21 and 70
        years old. If you're under 25 or over 70, you might have to pay an
        additional fee.
      </div>
    ),
    value: 'age'
  },
  {
    control: 'Can I book a hire car for someone else?',
    panel: (
      <div>
        Yes, as long as they meet these requirements. Just fill in their details
        while you're making the reservation.
      </div>
    ),
    value: 'someone else'
  },
  {
    control: 'How do I find the cheapest car hire deal?',
    panel: (
      <div>
        We work with all the major international car hire brands (and lots of
        smaller local companies) to bring you a huge choice of cars at the very
        best prices. That's how we can find you cheap car hire deals at over
        60,000 locations worldwide. To compare prices and find your ideal car at
        an unbeatable price, just use our search form.
      </div>
    ),
    value: 'rate'
  },
  {
    control: "What should I look for when I'm choosing a car?",
    panel: <ThingsToLook />,
    value: 'things to look'
  },
  {
    control: 'Are all fees included in the rental price?',
    panel: (
      <div>
        The vast majority of our rentals include Theft Protection, Collision
        Damage Waiver (CDW), local taxes, airport surcharges and any road fees.
        You'll pay for any ‘extras' when you pick your car up, along with any
        young driver, additional driver or one-way fees – but we'll explain any
        additional costs before you book your car (and taking your own child
        seats or GPS can be an easy way to reduce your costs). For more details
        on what's included, just check the Ts&Cs of any car you're looking at.
      </div>
    ),
    value: 'fees and vats'
  }
]

export const addInfo = [
  {
    control: 'Related Searches',
    panel: [
      'Luxury Car Hire',
      'Convertible Car Hire',
      '7 & 9 Seater Car Hire',
      'One-Way Car Hire',
      'Car Hire Europe',
      'Airport Car Hire',
      'Magazine',
      'RentalGuides',
      'Car Hire Companies',
      'All Countries',
      'Popular Countries',
      'Popular Cities',
      'Popular Airports'
    ]
  },
  {
    control: 'Popular Destinations',
    panel: [
      'Calgary car hire',
      'Toronto car hire',
      'Geneva car hire',
      'Frankfurt car hire',
      'Athens car hire',
      'Bali car hire',
      'Keflavik car hire',
      'Sorrento car hire',
      'Naha car hire',
      'Doha car hire',
      'Phuket car hire',
      'Salt Lake City car hire'
    ]
  },
  {
    control: 'Airports',
    panel: [
      'Dubai Airport',
      'Frankfurt Airport',
      'Geneva Airport',
      'Phuket Airport',
      'Keflavik Airport',
      'Heathrow Airport',
      'Naha Airport',
      'Salt Lake City Airport',
      'Calgary Airport',
      'Toronto Airport'
    ]
  },
  {
    control: 'Car Hire Companies',
    panel: [
      'Avis',
      'Alamo',
      'Avec Car Rentals',
      'Keddy By Europcar',
      'Bargain Car Rentals',
      'Circular Car Hire',
      'tr.brands.dollarDubai',
      'Garenta',
      'Orlando',
      'Paradise',
      'Sixt',
      'tr.brands.yesaway'
    ]
  }
]
