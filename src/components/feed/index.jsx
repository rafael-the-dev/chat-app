
import AdBanner from "./components/ad-banner"
import KnownPeople from "./components/known-people"

const Feed = () => {
    return (
        <div className="flex grow items-stretch pr-8 dark:bg-stone-900">
            <div className="grow"></div>
            <aside className="flex flex-col items-stretch pt-8 pb-6 w-[300px]">
                <KnownPeople />
                <AdBanner />
            </aside>
        </div>
    );
};

export default Feed;