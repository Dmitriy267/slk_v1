import './FundraisingChart.sass';
import { formatNum } from '../../../utils/formatNumToMoney';

export const FundraisingChart = ({ amountNeeded, amountCurrent, isBig = false }) => {
  // Расчет длины блока, отображающего количество собранных средств
  const style = {
    width: `${(amountCurrent / amountNeeded) * 100}%`
  };

  return (
    <div className="fund-chart">
      <div className="fund-chart__amounts">
        <span className={isBig ? 'fund-chart__amount_type_big' : 'fund-chart__amount'}>
          {amountCurrent ? formatNum(amountCurrent) : 0} &#x20bd;
        </span>
        <span className={isBig ? 'fund-chart__amount_type_big' : 'fund-chart__amount'}>
          {formatNum(amountNeeded)} &#x20bd;
        </span>
      </div>

      <div className="fund-chart__charts">
        <div
          className={`fund-chart__current ${isBig ? 'fund-chart__current_type_bold' : ''}`}
          style={style}
        >
          <div className={`fund-chart__star ${isBig ? 'fund-chart__star_type_bold' : ''}`} />
        </div>
        <div className={`fund-chart__needed ${isBig ? 'fund-chart__needed_type_bold' : ''}`}></div>
      </div>
    </div>
  );
};

