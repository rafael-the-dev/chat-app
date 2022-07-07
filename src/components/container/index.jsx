import classNames from "classnames"
import { useRouter } from "next/router"

const Container = ({ children }) => {
    const router = useRouter();
    const { query, pathname } = router;
    const { page } = query;

    const isChatPage = () => {
        if(page) {
            return ([ 'direct-chat', 'group-chat' ].includes(page) && pathname === '/chat');
        }

        return false;
    };
    
    return (
        <div className={classNames('h-ful sub-root dark:bg-stone-500', { 'sub-root--chat': isChatPage() })}>
            { children }
        </div>
    );
};

export default Container;