import React from 'react';
import './Recvicites.scss';
export function Recvicites() {
  return (
    <div className="wrapper__div">
      <h2>Реквизиты</h2>
      <div className="block-info__div">
        <div className="block-info__div_internal">
          <p>АНОО "Солнечный круг"</p>
          <div className="block__div_flex">
            <div className="block-info__div_int">
              <ul className="block-info__div_intLeft">
                <li>ИНН:</li>
                <li>КПП:</li>
                <li>ОГРН:</li>
                <li>ОКПО:</li>
              </ul>
              <ul className="block-info__div_intRight">
                <li>6382997402</li>
                <li>632101001</li>
                <li>1146300000571</li>
                <li>21276479</li>
              </ul>
            </div>
            <div className="block-info__div_int2">
              <ul className="block-info__div_intLeft2">
                <li>Расчетный счет:</li>
                <li>Банк:</li>
                <li>БИК:</li>
                <li>Корр.счет:</li>
              </ul>
              <ul className="block-info__div_intRight2">
                <li>40703810911240000417</li>
                <li>ФИЛИАЛ "ЦЕНТРАЛЬНЫЙ" БАНКА ВТБ (ПАО)</li>
                <li>044525411</li>
                <li>30101810145250000411</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
