
import AdBanner from "./components/ad-banner"

const Feed = () => {
    return (
        <div className="flex grow items-stretch pr-8">
            <div className="grow"></div>
            <aside className="flex flex-col items-stretch pb-6 w-[250px]">
                <div className="h-[350px]"></div>
                <AdBanner />
            </aside>
        </div>
    );
};

export default Feed;