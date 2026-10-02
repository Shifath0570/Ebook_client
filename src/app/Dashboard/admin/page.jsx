
"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Chip,
  ProgressBar,
  Spinner,
} from "@heroui/react";

export default function AIAnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/analytics/ai");
      const result = await res.json();
      if (result.success) {
        setData(result);
      } else {
        setError(result.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to fetch analytics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Spinner size="lg" color="primary" />
        <p className="text-gray-500 text-sm animate-pulse">
          Analyzing platform activity & generating AI insights...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <Card className="max-w-md mx-auto my-8 border border-danger">
        <CardContent className="text-center p-6">
          <p className="text-danger font-semibold mb-4">
            {error || "Failed to load analytics data."}
          </p>
          <Button color="primary" variant="flat" onPress={fetchAnalytics}>
            Retry Analysis
          </Button>
        </CardContent>
      </Card>
    );
  }

  const { rawMetrics, aiInsights } = data;
  const topGenres = rawMetrics?.publishingStats?.topGenres || [];
  const totalEbooks = rawMetrics?.publishingStats?.totalEbooks || 1;

  const getChipColor = (type) => {
    switch (type) {
      case "positive": return "success";
      case "warning": return "warning";
      case "danger": return "danger";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Fable AI Platform Intelligence
          </h1>
          <p className="text-small text-default-500">
            Real-time automated analytics powered by Gemini.
          </p>
        </div>
        <Button
          color="primary"
          variant="shadow"
          onPress={fetchAnalytics}
          isLoading={loading}
        >
          Refresh AI Report
        </Button>
      </div>

      {/* Health & Executive Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-2 border border-default-100 shadow-sm">
          <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold text-default-400">
              Platform Health Score
            </p>
            <h4 className="font-bold text-3xl mt-1 text-primary">
              {aiInsights?.healthScore} / 100
            </h4>
          </CardHeader>
          <CardContent className="overflow-visible py-2">
            <ProgressBar
              aria-label="Platform Health Score"
              size="md"
              value={aiInsights?.healthScore || 0}
              color={aiInsights?.healthScore > 80 ? "success" : "warning"}
              className="mt-2"
            />
            <p className="text-xs text-default-400 mt-4">
              Evaluated based on reader retention, revenue, and active publishing output.
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 p-2 border border-default-100 shadow-sm">
          <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold text-default-400">
              Executive AI Summary
            </p>
          </CardHeader>
          <CardContent className="py-3">
            <p className="text-default-700 leading-relaxed text-sm">
              {aiInsights?.summary}
            </p>
            <hr className="my-3 border-default-200" />
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-default-500">
                Supply/Demand Balance:
              </span>
              <Chip size="sm" color="secondary" variant="flat">
                {aiInsights?.readerWriterBalance?.ratio}
              </Chip>
              <Chip size="sm" color="success" variant="dot">
                {aiInsights?.readerWriterBalance?.status}
              </Chip>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Highlights & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-default-100 shadow-sm">
          <CardHeader>
            <h3 className="text-md font-bold">Key Platform Highlights</h3>
          </CardHeader>
          <hr className="border-default-200" />
          <CardContent className="space-y-4">
            {aiInsights?.highlights?.map((item, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-default-50 flex flex-col gap-1"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm text-foreground">
                    {item.title}
                  </span>
                  <Chip
                    size="sm"
                    color={getChipColor(item.type)}
                    variant="flat"
                  >
                    {item.type}
                  </Chip>
                </div>
                <p className="text-xs text-default-600">{item.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-default-100 shadow-sm">
          <CardHeader>
            <h3 className="text-md font-bold">Recommended Admin Actions</h3>
          </CardHeader>
          <hr className="border-default-200" />
          <CardContent className="space-y-4">
            {aiInsights?.actionableRecommendations?.map((rec, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border border-default-200 flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <p className="text-xs font-medium text-foreground">
                    {rec.action}
                  </p>
                  <span className="text-[10px] text-default-400">
                    Target Role: <strong>{rec.targetRole}</strong>
                  </span>
                </div>
                <Chip
                  size="sm"
                  color={rec.impact === "High" ? "danger" : "primary"}
                  variant="solid"
                >
                  {rec.impact} Impact
                </Chip>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Metrics Table */}
      <Card className="border border-default-100 shadow-sm">
        <CardHeader>
          <h3 className="text-md font-bold">Platform Metrics Snapshot</h3>
        </CardHeader>
        <hr className="border-default-200" />
        <CardContent className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-default-200 text-xs uppercase text-default-500 font-semibold">
                <th className="pb-3 pt-1 px-2">Genre</th>
                <th className="pb-3 pt-1 px-2">Total Ebooks</th>
                <th className="pb-3 pt-1 px-2">Popularity Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-default-100">
              {topGenres.map((genreItem, idx) => {
                const percent = Math.round((genreItem.count / totalEbooks) * 100);
                return (
                  <tr key={idx} className="hover:bg-default-50/50">
                    <td className="py-3 px-2 font-medium text-foreground">
                      {genreItem.genre}
                    </td>
                    <td className="py-3 px-2 text-default-600">
                      {genreItem.count}
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <ProgressBar
                          size="sm"
                          value={percent}
                          color="accent"
                          className="max-w-md"
                        />
                        <span className="text-xs text-default-500">
                          {percent}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}





