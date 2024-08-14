'use client'

import React from "react";
import {useParams, useRouter} from "next/navigation";
import {useAsyncList} from "@react-stately/data";
import {fetchVideos} from "@/lib/fetchVideos";
import {getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import {Pagination} from "@nextui-org/pagination";
import {Spinner} from "@nextui-org/spinner";

export default function VideoList() {

    const [isLoading, setIsLoading] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const router = useRouter();
    const params = useParams<{ id: string; }>();


    let list = useAsyncList({
        async load({signal}) {
            let res = await fetchVideos(signal);
            setIsLoading(false);
            return {
                items: res,
            };
        },
        async sort({items, sortDescriptor}) {
            return {
                items: items.sort((a, b) => {
                    let first = a[sortDescriptor.column];
                    let second = b[sortDescriptor.column];
                    let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1;
                    }

                    return cmp;
                }),
            };
        },
    });

    const rowsPerPage = 10;
    const pagedItems = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return list.items.slice(start, end);
    }, [page, list]);

    const pages = Math.ceil(list.items.length / rowsPerPage);

    const handleDoubleClick = (videoId) => {
        const id: number = Number(videoId);
        // Navigate to the details page with query parameters
        if (id && Number.isInteger(id)) {
            router.push(`/videoDetail/${id}`);
        }
    };

    return (
        <Table
            isStriped
            color='danger'
            selectionMode="single"
            selectionBehavior="replace"
            defaultSelectedKeys={["id"]}
            aria-label="Example table with client side sorting"
            sortDescriptor={list.sortDescriptor}
            onSortChange={list.sort}
            onRowAction={(key) => handleDoubleClick(key)}
            classNames={{
                table: "min-h-[222px]",
                wrapper: "min-h-[222px]",
            }}
            bottomContent={
                <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            }
        >
            <TableHeader>
                <TableColumn key="id" allowsSorting>
                    ID
                </TableColumn>
                <TableColumn key="title" allowsSorting>
                    Title
                </TableColumn>
                <TableColumn key="duration" allowsSorting>
                    Duration
                </TableColumn>
                <TableColumn key="videoDescription" allowsSorting>
                    Description
                </TableColumn>
                <TableColumn key="publishDate" allowsSorting>
                    Publish Date
                </TableColumn>
            </TableHeader>
            <TableBody
                items={pagedItems}
                isLoading={isLoading}
                loadingContent={<Spinner label="Loading..." />}
            >
                {(item) => (
                    <TableRow key={item.id} onClick={handleDoubleClick}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>

    );
}
