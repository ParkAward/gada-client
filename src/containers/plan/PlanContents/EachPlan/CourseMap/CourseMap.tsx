import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import { Place } from 'store/modules/plan';
import jeju from 'images/jeju.jpg';
import PlaceMarker from './PlaceMarker';
import PlacePolyline from './PlacePolyline';

const placeListSelector = (state: RootState) => state.plan.planList;
const setDaySelector = (state: RootState) => state.plan.setDay;
const placeDistanceSelector = (state: RootState) => state.plan.placeDistance;
const placeDistanceCenterSelector = (state: RootState) =>
    state.plan.placeDistanceCenter;
const mapCenterBoundSelector = (state: RootState) => state.plan.mapCenterBound;

const CourseMap = () => {
    const placeList: Place[][] = useSelector(placeListSelector);
    const setDay = useSelector(setDaySelector);
    const placeDistance = useSelector(placeDistanceSelector);
    const placeDistanceCenter = useSelector(placeDistanceCenterSelector);
    const mapCenterBound = useSelector(mapCenterBoundSelector);

    const mapRef = useRef<kakao.maps.Map>(null);
    useEffect(() => {
        const map = mapRef.current;
        if (map && mapCenterBound) map.setBounds(mapCenterBound);
    }, [mapCenterBound]);

    return (
        <Container>
            <Map
                center={{ lat: 33.450701, lng: 126.570667 }}
                style={{
                    width: '100%',
                    height: '100%',
                }}
                ref={mapRef}
            >
                {placeList.length > 0 &&
                    placeList[setDay].length > 0 &&
                    placeList[setDay].map((placeDetail, index) => {
                        const position = getPositionByIPlace(placeDetail);
                        return (
                            <>
                                <PlaceMarker
                                    key={`marker-${placeDetail.name}-${placeDetail.latitude}-${placeDetail.longitude}`}
                                    position={position}
                                    name={placeDetail.name}
                                    img={placeDetail.imgUrl ?? jeju}
                                />
                                <PlacePolyline
                                    key={`line-${placeDetail.name}-${placeDetail.latitude}-${placeDetail.longitude}`}
                                    path={
                                        index > 0
                                            ? [
                                                  getPositionByIPlace(
                                                      placeList[setDay][
                                                          index - 1
                                                      ],
                                                  ),
                                                  position,
                                              ]
                                            : [position]
                                    }
                                />
                            </>
                        );
                    })}
            </Map>
        </Container>
    );
};

const getPositionByIPlace = (data: Place) => ({
    lng: Number(data.longitude),
    lat: Number(data.latitude),
});

const Container = styled.div`
    background-color: #faeacd;

    width: 810px;
    height: 620px;
    margin: 0 30px 30px 30px;
`;

export default CourseMap;
