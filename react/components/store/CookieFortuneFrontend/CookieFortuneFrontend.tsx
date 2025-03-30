import React, { useEffect, useState } from 'react';
import "./CookieFortuneStyles.css";
import closedCookie from "./../../../assets/fortune-cookie-closed-1.png";
import openedCookie from "./../../../assets/fortune-cookie-opened.png";
import { useCssHandles } from 'vtex.css-handles'
import { Button } from 'vtex.styleguide'

import GET_FORTUNE_MESSAGES from './../../../graphql/getMessagesForCookieFortune.graphql'
import { useQuery } from 'react-apollo'

interface Field {
  key: string;
  value: string;
}
interface Document {
  fields: Field[];
}

interface CookieData {
  documents: Document[];
}

function getCookieFortunes(data: CookieData): string[] {
  return data.documents
      .flatMap(doc => doc.fields)
      .filter(field => field.key === "CookieFortune")
      .map(field => field.value);
}

const CSS_HANDLES = [
  'fortuneContainer',
  'cookieContainer',
  'openedCookieWrapper',
  'cookieImage',
  'openedCookie',
  'closedCookie',
  'fortuneTextContainer',
  'fortuneText',
  'luckyNumber',
  'fortuneButton',
  'newFortuneButton',
  'spinner',
  'animateCookie',
  'tryYourLuckHeading'
] as const

export default function CookieFortuneFrontend(): JSX.Element {

  const { handles } = useCssHandles(CSS_HANDLES)
  const [searchForCookieFortunes, setSearchForCookieFortunes] = useState(Number(Math.floor(Math.random() * (500 - 300 + 1)) + 300))

  const { data: cookieFortunes, error } = useQuery(GET_FORTUNE_MESSAGES,{
      variables: {
        page: 1,
        pageSize: searchForCookieFortunes
}});

  const [fortune, setFortune] = useState<string | null>(null);
  const [luckyNumber, setLuckyNumber] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCookieOpen, setIsCookieOpen] = useState(false);
  const [isComponentReady, setIsComponentReady] = useState(false);
  const [animateCookie, setAnimateCookie] = useState(false);
  const [fortunes, setFortunes] = useState<string[]>([]);

  useEffect(() => {
    if(cookieFortunes){
      setFortunes(getCookieFortunes(cookieFortunes))
    }
  }, [cookieFortunes])

  useEffect(() => {
    setIsComponentReady(true)
  }, [])

  if (error) {
    console.error("Error fetching fortune messages:", error);
    // You might want to render an error state here
  }

  const fetchFortune = (): void => {
    setSearchForCookieFortunes(Number(Math.floor(Math.random() * (500 - 300 + 1)) + 300))
    setIsLoading(true);
    setIsCookieOpen(false);
    setAnimateCookie(false); // Reset animation state

    // Force reflow to ensure animation can be triggered again
    setTimeout(() => {
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      setFortune(randomFortune);

      const part1 = Math.floor(Math.random() * 90 + 10).toString().padStart(2, '0');
      const part2 = Math.floor(Math.random() * 90 + 10).toString().padStart(2, '0');
      const part3 = Math.floor(Math.random() * 9000 + 1000).toString().padStart(4, '0');
      setLuckyNumber(`${part1}-${part2}-${part3}`);

      setIsCookieOpen(true);
      setAnimateCookie(true);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className={`${handles.fortuneContainer}`}>
      {
        isComponentReady ?
          <>
            <h1>Fortune Cookie</h1>
            <h2 className={`${handles.tryYourLuckHeading}`}>Try your luck!</h2>
            <div className={`${handles.cookieContainer}`}>
              {isCookieOpen ? (
                <div className={`${handles.openedCookieWrapper}`}>
                  <img
                    src={openedCookie}
                    alt="Opened fortune cookie"
                    className={`${handles.cookieImage} ${handles.openedCookie} ${animateCookie ? handles.animateCookie : ''}`}
                    onAnimationEnd={() => setAnimateCookie(false)}
                  />
                  <div className={`${handles.fortuneTextContainer}`}>
                    {fortune && !isLoading && (
                      <h3 className={`${handles.fortuneText}`}>{fortune}</h3>
                    )}
                    {luckyNumber && !isLoading && (
                      <h5 className={`${handles.luckyNumber}`}>Your Lucky Number is {luckyNumber}</h5>
                    )}
                  </div>
                </div>
              ) : (
                <img
                  src={closedCookie}
                  alt="Closed fortune cookie"
                  className={`${handles.cookieImage} ${handles.closedCookie}`}
                  style={{ cursor: isLoading ? 'wait' : 'pointer' }}
                  onClick={!isLoading ? fetchFortune : undefined}
                />
              )}
            </div>

            <div className={`${handles.fortuneButton} ${isCookieOpen ? handles.newFortuneButton : ''}`}>
              <Button
                onClick={fetchFortune}
                disabled={isLoading}
                isLoading={isLoading}
                variation="primary"
                size="large"
              >
                {isCookieOpen ? "Open Another Cookie" : "Open Cookie"}
              </Button>
            </div>
          </>
          :
          <></>
      }
    </div>
  );
}
