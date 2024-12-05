import './App.css'
import {useEffect, useState} from "react";
import {CodeBlock, dracula} from 'react-code-blocks';

function App() {

    const [challenge, setChallenge] = useState<{ year: number, day: number }>({year: 2024, day: 1})
    const [input, setInput] = useState<string>('');
    const [solveFn, setSolveFn] = useState<{default: (input: string) => string}>({default: () => ''});
    const [code, setCode] = useState<string>('');
    const [part, setPart] = useState<1 | 2>(1);
    const [output, setOutput] = useState<string>('');

    useEffect(() => {
        fetch(`/${challenge.year}/${challenge.day}/input`).then(res => res.text()).then(input => {
            setInput(input);
        }).catch(() => {
            console.error('Unable to retrieve input')
        })
    }, [challenge]);

    useEffect(() => {
        import(`./${challenge.year}/${challenge.day}/solution${part}.ts`).then(solution => {
            setSolveFn(solution);
            fetch(`${challenge.year}/${challenge.day}/solution${part}.ts`).then(res => res.text()).then(_code => {
                setCode(_code);
            })
        }).catch((e) => {
            console.error('Unable to retrieve solution', e)
        })
    }, [challenge.day, challenge.year, input, part]);

    useEffect(() => {
        setOutput(solveFn?.default(input))
    }, [input, solveFn]);

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
                    <section>
                        <span onClick={() => setPart(1)}>Part one</span>
                        <span onClick={() => setPart(2)}>Part two</span>
                    </section>

                    <CodeBlock language="typescript" text={code} theme={dracula}></CodeBlock>

                    <p>Output: {output}</p>
                </main>
            </div>
        </>
    )
}

export default App
