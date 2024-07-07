import MessageView from "../MessageView";

import { useRef, useEffect } from "react";

function MessageListView(props, ref) {
    var messageItemList = [];

    props.messageList.forEach(item => {
        messageItemList = [
            <MessageView
                text={item.text}
                senderId={item.senderId}
                timeStamp={item.timeStamp}
            />,
            ...messageItemList
        ];
    });
    const messageListRef = useRef();
    useEffect(() => {
        if (messageItemList.length !== 0) {
            messageListRef.current.scrollTop =
                messageListRef.current.scrollHeight;
        }
    }, [messageItemList.length]);
    return (
        <div ref={messageListRef} className="overflow-y-scroll no-scrollbar">
            {messageItemList}
        </div>
    );
}

export default MessageListView;
