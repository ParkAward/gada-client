import React, {
    FC,
    useEffect,
    useRef,
    useCallback,
    useState,
    Dispatch,
    SetStateAction,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReactSortable } from 'react-sortablejs';
import PlaceBox from 'components/PlaceBox';
import { RootState } from 'store/modules';
import {
    IPlace,
    grabPlan,
    grabPlaceOption,
    movePlaceOptionToPlan,
    sortPlanList,
} from 'store/modules/plan';

const planListSelector = (state: RootState) => state.plan.planList;
const setDaySelector = (state: RootState) => state.plan.setDay;

const grabPlaceOptionIdSelector = (state: RootState) =>
    state.plan.grabPlaceOptionId;

const SetupRoute: FC = () => {
    const dispatch = useDispatch();
    const planList = useSelector(planListSelector);
    const setDay = useSelector(setDaySelector);
    const grabPlaceOptionId = useSelector(grabPlaceOptionIdSelector);
    const [isDrop, setIsDrop] = useState(false);
    const droppedRef = useRef<HTMLElement | null>(null);
    const enterCnt = useRef(0);

    useEffect(() => {
        if (isDrop) {
            setIsDrop(false);
            const node = droppedRef.current;
            node?.classList.add('focus');
            node?.scrollIntoView();
            setTimeout(() => {
                node?.classList.remove('focus');
            }, 500);
        }
    }, [planList]);

    const onDragStartPlace = useCallback(
        (e: React.DragEvent<HTMLElement>): void => {
            enterCnt.current = 0;
            dispatch(grabPlaceOption({ id: null }));
            dispatch(grabPlan({ id: e.currentTarget.dataset.id }));
        },
        [],
    );

    const onDragEnterConainer = useCallback(
        (e: React.DragEvent<HTMLElement>) => {
            if (!grabPlaceOptionId) return;
            enterCnt.current += 1;
            e.currentTarget.classList.add('drag-over');
        },
        [grabPlaceOptionId],
    );

    const onDragLeaveConainer = useCallback(
        (e: React.DragEvent<HTMLElement>) => {
            if (!grabPlaceOptionId) return;
            enterCnt.current -= 1;
            if (enterCnt.current === 0) {
                e.currentTarget.classList.remove('drag-over');
            }
        },
        [grabPlaceOptionId],
    );

    const onDropContainer = useCallback(
        (e: React.DragEvent<HTMLElement>) => {
            if (!grabPlaceOptionId) return;
            e.currentTarget.classList.remove('drag-over');
            dispatch(movePlaceOptionToPlan());
            setIsDrop(true);
        },
        [grabPlaceOptionId],
    );

    const getSortableList = (list: IPlace[][]): IPlace[] => {
        if (!(list.length > 1)) return [];

        return list[setDay].map((x) => ({
            ...x,
            chosen: true,
        }));
    };
    const onSort = (list: IPlace[]): void => {
        if (!(list.length > 0)) return;
        dispatch(sortPlanList({ list }));
    };

    return (
        <Container
            onDragEnter={onDragEnterConainer}
            onDragLeave={onDragLeaveConainer}
            onDrop={onDropContainer}
            onDragOver={(e) => e.preventDefault()}
        >
            {setDay}
            <ReactSortable
                animation={150}
                list={getSortableList(planList)}
                setList={onSort}
            >
                {planList.length > 1 &&
                    planList[setDay].map((plan: IPlace, index: number) => {
                        return (
                            <PlaceBox
                                focusRef={
                                    index === planList[setDay].length - 1
                                        ? (droppedRef as React.RefObject<HTMLDivElement>)
                                        : null
                                }
                                key={plan.id}
                                dataId={plan.id}
                                onDragStartPlace={onDragStartPlace}
                                placename={plan.name}
                                location={plan.address}
                            />
                        );
                    })}
            </ReactSortable>
        </Container>
    );
};

const Container = styled.div`
    width: 450px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 15px;
    overflow-x: hidden;
    overflow-y: scroll !important;


    &::-webkit-scrollbar {
        width: 10px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 10px;
        background-clip: padding-box;
        border: 2px solid transparent;
    }

    &::-webkit-scrollbar-track {
        background-color: #eee;
        border-radius: 10px;
        box-shadow: inset 0px 0px 5px white;
    }

    &.drag-over {
        border: solid 2px ${({ theme }) => theme.PRIMARY};
        border-radius: 20px;
        background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
    }

    &.drag-over {
        border: solid 2px ${({ theme }) => theme.PRIMARY};
        border-radius: 20px;
        background-color: ${({ theme }) => theme.PRIMARY_LIGHT};
    }
`;

export default SetupRoute;