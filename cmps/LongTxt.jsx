const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    const shortTxt = txt.substring(0, length)
    const [text, setText] = useState(shortTxt)

    function toggleText() {
        setText(text.length === txt.length ? shortTxt : txt)
    }

    const toggleTextLength = text.length === txt.length ? ' ...read less' : ' ...read more'

    return <section className="long-text">
        <p>{text}<span className="read-more" onClick={toggleText}>{toggleTextLength}</span></p>
    </section>
}