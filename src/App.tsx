import './App.css'
import {useEffect, useState} from "react";
import {CodeBlock, dracula} from 'react-code-blocks';

function App() {

    const [challenge, setChallenge] = useState<{ year: number, day: number }>({year: 2024, day: 1})
    const [input, setInput] = useState<string>('');
    const [solveFn, setSolveFn] = useState<{default: (input: string) => string}>({default: (_) => ''});
    const [code, setCode] = useState<string>('');

    useEffect(() => {
        fetch(`./${challenge.year}/${challenge.day}/input`).then(res => res.text()).then(input => {
            setInput(input);
        }).catch(() => {
            console.error('Unable to retrieve input')
        })
    }, [challenge]);

    useEffect(() => {
        import(`./${challenge.year}/${challenge.day}/solution.ts`).then(solution => {
            setSolveFn(solution);
            fetch(`./${challenge.year}/${challenge.day}/solution.ts`).then(res => res.text()).then(_code => {
                setCode(_code);
            })
        }).catch(() => {
            console.error('Unable to retrieve solution')
        })
    }, [challenge.day, challenge.year, input]);

    useEffect(() => {
        console.log(solveFn?.default(input))
    }, [solveFn]);

    const challenges = [
        {year: 2024, days: [1, 2]}
    ]

    const onDayClicked = (year: number, day: number) => {
        setChallenge({year, day});
    }

    return (
        <>
            <div className="layout">
                <nav>
                    {challenges.map((challenge, index) => (
                        <div key={index}>
                            <p>{challenge.year}</p>
                            {challenge.days.map(day => (<p key={challenge.year + '' + day}
                                                           onClick={() => onDayClicked(challenge.year, day)}>{day}</p>))}
                        </div>
                    ))}
                </nav>
                <main>
                    <h1>{challenge.year} → {challenge.day}</h1>

                    <CodeBlock language="typescript" text={code} theme={dracula}></CodeBlock>
                </main>
            </div>
        </>
    )
}

export default App
