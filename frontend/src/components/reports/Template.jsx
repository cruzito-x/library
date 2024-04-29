import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  item: {
    marginBottom: 5,
  },
});

const Template = ({ title, data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}> {title} </Text>
        {data.map((item, index) => (
          <Text key={index} style={styles.item}> {item} </Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default Template;
