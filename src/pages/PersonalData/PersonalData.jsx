import React from 'react';
import styles from './PersonalData.module.scss';
export function PersonalData() {
  return (
    <>
      <h1 className={styles.title__h1}>СОГЛАСИЕ на обработку персональных данных</h1>
      <div className={styles.wrapper__div}>
        <p>
          Пользователь, оставляя заявку, оформляя подписку, комментарий, запрос на обратную связь,
          регистрируясь либо совершая иные действия, связанные с внесением своих персональных данных
          на интернет-сайте https://www.new.slkrug.ru, принимает настоящее Согласие на обработку
          персональных данных (далее – Согласие), размещенное по адресу #PD_TERMS_PAGE_URL#.
        </p>
        <p>
          Принятием Согласия является подтверждение факта согласия Пользователя со всеми пунктами
          Согласия.{' '}
        </p>
        <p>
          Пользователь дает свое согласие Автономной некоммерческой общеобразовательной организации
          «Комплексный общеобразовательный центр для детей с нарушениями развития «Солнечный круг»
          (далее АНОО «Солнечный круг»), которой принадлежит{' '}
          <a href="https://www.new.slkrug.ru">https://www.new.slkrug.ru</a>, на обработку своих
          персональных данных со следующими условиями:
        </p>
        <p>
          Пользователь дает согласие на обработку своих персональных данных, как без использования
          средств автоматизации, так и с их использованием.
        </p>
        <p>
          Согласие дается на обработку следующих персональных данных (не являющимися специальными
          или биометрическими):
        </p>
        <ul className={styles.contacts}>
          <li>- фамилия, имя, отчество;</li>
          <li>- адрес(а) электронной почты;</li>
          <li>- телефон;</li>
          <li>- иные данные, предоставляемые Пользователем.</li>
        </ul>

        <p>Персональные данные пользователя не являются общедоступными.</p>
        <ol type="1" className={styles.listPersonals__ol}>
          <li>
            Целью обработки персональных данных является предоставление полного доступа к
            функционалу сайта https://www.new.slkrug.ru.
          </li>
          <li>
            Основанием для сбора, обработки и хранения персональных данных являются:
            <ul className={styles.listPersonals__ul} type="disc">
              <li>Ст. 23, 24 Конституции Российской Федерации;</li>
              <li>
                Ст. 2, 5, 6, 7, 9, 18–22 Федерального закона от 27.07.06 года №152-ФЗ «О
                персональных данных»;
              </li>
              <li>Ст. 18 Федерального закона от 13.03.06 года № 38-ФЗ «О рекламе»;</li>
              <li>Устав организации АНОО «Солнечный круг» от 2020г.;</li>
              <li>Политика обработки персональных данных.</li>
            </ul>
          </li>
          <li>
            В ходе обработки с персональными данными будут совершены следующие действия с
            персональными данными: сбор, запись, систематизация, накопление, хранение, уточнение
            (обновление, изменение), извлечение, использование, передача (распространение,
            предоставление, доступ), обезличивание, блокирование, удаление, уничтожение.
          </li>
          <li>
            Передача персональных данных, скрытых для общего просмотра, третьим лицам не
            осуществляется, за исключением случаев, предусмотренных законодательством Российской
            Федерации.
          </li>
          <li>
            Пользователь подтверждает, что указанные им персональные данные принадлежат лично ему.
          </li>
          <li>
            Персональные данные хранятся и обрабатываются до момента ликвидации организации АНОО
            «Солнечный круг». Хранение персональных данных осуществляется согласно Федеральному
            закону №125-ФЗ «Об архивном деле в Российской Федерации» и иным нормативно правовым
            актам в области архивного дела и архивного хранения.
          </li>
          <li>
            Пользователь согласен на получение информационных сообщений с сайта
            https://www.new.slkrug.ru. Персональные данные обрабатываются до отписки Пользователя от
            получения информационных сообщений.
          </li>
          <li>
            Согласие может быть отозвано Пользователем либо его законным представителем, путем
            направления Отзыва согласия на электронную почту – slkrug@ya.ru с пометкой «Отзыв
            согласия на обработку персональных данных». В случае отзыва Пользователем согласия на
            обработку персональных данных организация АНОО «Солнечный круг» вправе продолжить
            обработку персональных данных без согласия Пользователя при наличии оснований, указанных
            в пунктах 2 - 11 части 1 статьи 6, части 2 статьи 10 и части 2 статьи 11 Федерального
            закона №152-ФЗ «О персональных данных» от 27.07.2006 г. Удаление персональных данных
            влечет невозможность доступа к полной версии функционала сайта
            https://www.new.slkrug.ru.
          </li>
          <li>
            Настоящее Согласие является бессрочным, и действует все время до момента прекращения
            обработки персональных данных, указанных в п.7 и п.8 данного Согласия.
          </li>
          <li>
            Место нахождения организации АНОО «Солнечный круг»: 445040, Самарская область, г.
            Тольятти, бульвар Туполева, дом 6.
          </li>
        </ol>
      </div>
    </>
  );
}
