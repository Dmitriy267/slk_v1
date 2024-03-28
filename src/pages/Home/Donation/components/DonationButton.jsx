import './DonationButton.sass'

export const DonationButton = ({ handleDonation, amount }) => {
  return (
    <button
      type="button"
      onClick={() => handleDonation(amount)}
      className="donation-button"
    >
      {`${amount} Р`}
    </button>
  );
};
