import React,  { useState } from 'react';

const Accordion = ({items}) => {

    const [activeIndex, setActiveIndex] = useState(null);

    const onTitleClick = (index) =>{
        setActiveIndex(index);
    }
    const renderedItems = items.map( (item,index) =>{
        const active = index ===activeIndex ? 'active' : '';
        return(
            <React.Fragment key={item.title}>
                <div className={`title ${active}`}
                onClick={(e)=> {
                    onTitleClick(index)}}
                >
                    <i className="dropdown icon">
                        {item.title}
                    </i>
                </div>
                <div className={`title ${active}`}>
                    <p>{item.content}</p>
                </div>
            </React.Fragment>
        )
    });

    return (<div className="ui styled accordion">
        {renderedItems}
        <h1>{activeIndex}</h1>
        </div>);
}

export default Accordion;