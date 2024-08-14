"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { useAsyncList } from "@react-stately/data";
import { Spinner } from "@nextui-org/spinner";
import { Pagination } from "@nextui-org/pagination";
import { useParams, useRouter } from "next/navigation";

import { fetchBlogs } from "../lib/fetchBlogs";

export default function BlogList() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const router = useRouter();
  const params = useParams<{ id: string }>();

  /*

        async load({signal}) {
            let res = await fetch('https://swapi.py4e.com/api/people/?search', {
                signal,
            });


            let json = await res.json();
            setIsLoading(false);

            return {
                items: json.results,
            };
        },
     */

  let list = useAsyncList({
    async load({ signal }) {
      let res = await fetchBlogs(signal);

      setIsLoading(false);

      return {
        items: res,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

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

  const handleDoubleClick = (blogId) => {
    const id: number = Number(blogId);

    // Navigate to the details page with query parameters
    if (id && Number.isInteger(id)) {
      router.push(`/blogDetail/${id}`);
    }
  };

  return (
    <Table
      isStriped
      aria-label="Example table with client side sorting"
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
      classNames={{
        table: "min-h-[222px]",
        wrapper: "min-h-[222px]",
      }}
      color="danger"
      defaultSelectedKeys={["id"]}
      selectionBehavior="replace"
      selectionMode="single"
      sortDescriptor={list.sortDescriptor}
      onRowAction={(key) => handleDoubleClick(key)}
      onSortChange={list.sort}
    >
      <TableHeader>
        <TableColumn key="id" allowsSorting>
          ID
        </TableColumn>
        <TableColumn key="title" allowsSorting>
          Title
        </TableColumn>
        <TableColumn key="readTime" allowsSorting>
          Read Time
        </TableColumn>
        <TableColumn key="publishDate" allowsSorting>
          Publish Date
        </TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        items={pagedItems}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(item) => (
          <TableRow key={item.id} onClick={handleDoubleClick}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
